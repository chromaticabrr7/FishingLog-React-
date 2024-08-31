import React, {useState, useEffect} from 'react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {fetchLogs, fetchLog, createLog, updateLog} from '../services/api'
import { useToast } from '../contexts/ToastContext';
import { formatDateToYYYYMMDD } from '../utils/helpers';

const schema = z.object({
    date: z.string().date(),
    latitude: z.string().min(1, 'Latitude is required ').max(9),
    longitude: z.string().min(1, 'Longitude is required').max(9),
    name: z.string().min(3, 'Location name is required'),
    species: z.string().transform(value => value.split(',').map(species => species.trim()))
});

function CreateModal({show, onClose, handleUpdatedData, setIsUpdate, isUpdate}) {
    // const [initialValues, setInitialValues] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Submit');
    const addToast = useToast();
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        reset,
        formState,
        formState: {errors, isSubmitting, isSubmitSuccessful},
    } = useForm({
        // defaultValues: {
        //     date: 'January 23, 2024',
        // }
        resolver: zodResolver(schema),
    });

    const processButtonLabel = () => {
        if (isUpdate !== null) {
            setButtonLabel('Update');
        } else {
            setButtonLabel('Submit');
        }
    };

    const onSubmit = async (data) => {
        console.log('Form Data:', data);
        console.log('Attached ID is:', isUpdate);

        if (isUpdate !== null) {
            setButtonLabel('Update');

            try {
                const response = await updateLog(data, isUpdate);
                if (response.ok) {
                    console.log('Update submitted successfully');
                    addToast('Update successful', 'The log you selected was successfully updated.', 'success');
                    onClose();
                    const updatedLogs = await fetchLogs();
                    handleUpdatedData(updatedLogs);
                } else {
                    console.log('Error submitting form');
                    addToast('Update unsuccessful', 'The log you selected failed to be updated.', 'error');
                }
            } catch (error) {
                console.error('Error submitting form', error);
            }
        } else {
            setButtonLabel('Submit');

            try {
                const response = await createLog(data);
                if (response.ok) {
                    console.log('Form submitted successfully');
                    addToast('Creation successful', 'The log you selected was successfully created.', 'success');
                    onClose();
                    const updatedLogs = await fetchLogs();
                    handleUpdatedData(updatedLogs);
                } else {
                    console.error('Error submitting form');
                    addToast('Create unsuccessful', 'The log submission could not be created.', 'error');
                }
            } catch (error) {
                console.error('Error submitting form', error);
            }
        }

        setIsUpdate(null);
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            setTimeout(() => {
                reset();
            }, 400);              
        }
    }, [formState, reset]);

    useEffect(() => {
        const findInitialValues = async () => {
            try {
                if (isUpdate != null) {
                    setIsLoading(true);
                    await fetchLog(isUpdate)
                        .then(response => {
                            console.log(response);
                            // setInitialValues(response);
                            setValue('date', formatDateToYYYYMMDD(response.date));
                            setValue('name', response.name);
                            setValue('latitude', response.latitude);
                            setValue('longitude', response.longitude);
                            setValue('species', response.species);
                        })
                        .catch(error => console.error('Error fetching data:', error))
                        .finally(() => setIsLoading(false));
                }
            } catch (error) {
                console.log(error);
            }  
        }

        findInitialValues();
        processButtonLabel();
    }, [isUpdate, setValue]);

    const handleCancel = () => {
        onClose();
        setTimeout(() => {
            setIsUpdate(null);
            reset();
        }, 400);
    };

    return(
        <>
            <div className={`modal ${show ? 'show' : ''}`} id="modal">
                <div className="modal-container">
                    <div className="modal-header-container">
                        <div className="label">
                            <div className="label-container">
                                <h1 className="label-heading font-semibold">Log new visit</h1>
                            </div>
                            <div className="label-container">
                                <h1 className="label-subheading font-semibold text-slate-500">Add details about a new fishing trip</h1>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="modal-form-container">
                        <div className="input-row">
                            <div className="label margin-bottom-sm">
                                <div className="label-container">
                                    <h1 className="label-heading text-slate-700 font-sm">Trip Date</h1>
                                </div>
                                <div className="label-container" style={{display: "none"}}>
                                    <h1 className="label-subheading">Subheading</h1>
                                </div>
                            </div>
                            <input {...register('date')} className="margin-bottom-sm calendar-icon" type="text" placeholder="YYYY-MM-DD" id="enterDate"/>
                            {errors.date && (
                                <div className="label">
                                    <div className="label-container">
                                        <h1 className="label-heading text-slate-700 font-sm error">{errors.date.message}</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="input-row">
                            <div className="label margin-top-xl margin-bottom-sm">
                                <div className="label-container">
                                    <h1 className="label-heading text-slate-700 font-sm">Location Name</h1>
                                </div>
                                <div className="label-container" style={{display: "none"}}>
                                    <h1 className="label-subheading">Subheading</h1>
                                </div>
                            </div>
                            <input {...register('name')} className="margin-bottom-sm" type="text" placeholder="Blackhawk Park" id="enterName"/>
                            {errors.name && (
                                <div className="label">
                                    <div className="label-container">
                                        <h1 className="label-heading text-slate-700 font-sm error">{errors.name.message}</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="input-row">
                            <div className="label label margin-top-xl margin-bottom-sm">
                                <div className="label-container">
                                    <h1 className="label-heading text-slate-700 font-sm">Latitude Coordinate</h1>
                                </div>
                                <div className="label-container" style={{display: "none"}}>
                                    <h1 className="label-subheading">Subheading</h1>
                                </div>
                            </div>
                            <input {...register('latitude')} className="margin-bottom-sm" type="text" placeholder="44.88592" id="enterLatitude"/>
                            {errors.latitude && (
                                <div className="label">
                                    <div className="label-container">
                                        <h1 className="label-heading text-slate-700 font-sm error">{errors.latitude.message}</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="input-row">
                            <div className="label label margin-top-xl margin-bottom-sm">
                                <div className="label-container">
                                    <h1 className="label-heading text-slate-700 font-sm">Longitude Coordinate</h1>
                                </div>
                                <div className="label-container" style={{display: "none"}}>
                                    <h1 className="label-subheading">Subheading</h1>
                                </div>
                            </div>
                            <input {...register('longitude')} className="margin-bottom-sm" type="text" placeholder="-93.18467" id="enterLongitude"/>
                            {errors.longitude && (
                                <div className="label">
                                    <div className="label-container">
                                        <h1 className="label-heading text-slate-700 font-sm error">{errors.longitude.message}</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="input-row">
                            <div className="label label margin-top-xl margin-bottom-sm">
                                <div className="label-container">
                                    <h1 className="label-heading text-slate-700 font-sm">Species Caught</h1>
                                </div>
                                <div className="label-container">
                                    <h1 className="label-subheading text-slate-500" style={{fontSize: "12px"}}>Separate entries with commas when entering</h1>
                                </div>
                            </div>
                            <input {...register('species')} className="margin-bottom-sm" type="text" placeholder="Pumpkinseed, Green Sunfish" id="enterSpecies"/>
                        </div>
                        <div className="modal-footer-container label margin-top-xl">
                            <div className="footer-left">
                                <button className="button-secondary-md font-medium" id="attachBtn"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-paperclip"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" /></svg>Attach photos</button>
                            </div>
                            <div className="footer-right">
                                <button type='button' onClick={handleCancel} className="button-secondary-md font-medium" id="cancelBtn">Cancel</button>
                                <button type='submit' className="button-primary-md font-medium" id="insertBtn">{buttonLabel}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
} 

export default CreateModal