import { createRef, useCallback, useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import useSWR from 'swr';
import Spinner from '../../components/Spinner';
import useDental from '../../hooks/useDental';
// import useDental from '../../context/DentalContext';

export default function FormularioHistorialM() {
    const [step, setStep] = useState(1);
    const [complications, setComplications] = useState(false);
    const [beingTreated, setBeingTreated] = useState(false);
    const [takingMedication, setTakingMedication] = useState(false);
    
    const [allergic, setAllergic] = useState(false);
    const preguntaComplicaciones = createRef();
    const preguntaTratamiento = createRef();
    const preguntaMedicamentos = createRef();
    const preguntaAlergias = createRef();
    const [inputCompliaciones, setInputComplicaciones] = useState('');
    const [inputTratamineto, setInputTratamiento] = useState('');
    const [examenCabeza, setExamenCabeza] = useState({});
    const [examenCara, setExamenCara] = useState({});
    const [examenATM, setExamenATM] = useState({});
    const [examenGanglios, setExamenGanglios] = useState({});
    const [examenLabios, setExamenLabios] = useState({});
    const [examenSeñas, setExamenSeñas] = useState({});
    const [inputMedicamentos, setInputMedicamentos] = useState('');
    const [inputAlergias, setInputAlergias] = useState('');
    const [inputExamenCabeza, setInputExamenCabeza] = useState('');
    const [inputValues, setInputValues] = useState({
        idexamen_cabeza: '',
        idexamen_cara: '',
        idexamen_atm: '',
        idexamen_ganglios: '',
        idexamen_labios: '',
        idexamen_señasp: ''
    });

    // Función para manejar los cambios de los inputs

    const { handleSubmitHistorial } = useDental();

    const idconsulta = localStorage.getItem('IDCONSULTA');
    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [diseaseDetails, setDiseaseDetails] = useState({});
    // console.log(step);
    const handleDiseaseChange = (disease) => {
        setSelectedDiseases((prevSelectedDiseases) => ({
            ...prevSelectedDiseases,
            [disease]: {
                ...prevSelectedDiseases[disease],
                selected: !prevSelectedDiseases[disease]?.selected,
            },
        }));
    };

    const handleInputTextChange = (disease, text) => {
        setSelectedDiseases(prevSelectedDiseases => ({
            ...prevSelectedDiseases,
            [disease]: {
                ...prevSelectedDiseases[disease],
                text: text,
            },
        }));
    };

    const fetcher = () => clienteAxios(`api/consultas/${idconsulta}`).then(datos => datos.data);
    const { data: datosConsultas, isLoading } = useSWR(`api/consultas/${idconsulta}`, fetcher);

    const fetcherEnfermedades = () => clienteAxios(`api/enfermedades`).then(datos => datos.data);
    const { data: datosEnfermedades, isLoading: loadingEnfermedades } = useSWR(`api/enfermedades`, fetcherEnfermedades);

    const cargarExamenes = async () => {
        const { data } = await clienteAxios.get(`api/examen_cabeza`);
        setExamenCabeza(data.data);
        console.log(data.data);
        const { data: data2 } = await clienteAxios.get(`api/examen_cara`);
        setExamenCara(data2.data);
        console.log(data2.data);
        const { data: data3 } = await clienteAxios.get(`api/examen_atm`);
        setExamenATM(data3.data);
        console.log(data3.data);
        const { data: data4 } = await clienteAxios.get(`api/examen_ganglios`);
        setExamenGanglios(data4.data);
        console.log(data4.data);
        const { data: data5 } = await clienteAxios.get(`api/examen_labios`);
        setExamenLabios(data5.data);
        console.log(data5.data);
        const { data: data6 } = await clienteAxios.get(`api/señas_particulares`);
        setExamenSeñas(data6.data);
        console.log(data6.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value
        });
    };

    useEffect(() => {
        cargarExamenes()
    }, []);

    useEffect(() => {        
        handleInputChange
    }, [inputValues]);

    // console.log(step);
    const nextStep = () => {
        if (!isAllDiseasesFilled()) {
            alert("Por favor, complete los detalles de todas las enfermedades seleccionadas antes de continuar.");
            return;
        }
        if (step == 2) {
            
            if (complications && !preguntaComplicaciones?.current?.value?.trim()) {
                return;
            } else {
                setInputComplicaciones(preguntaComplicaciones?.current?.value?.trim());
            }
            if (beingTreated && !preguntaTratamiento?.current?.value?.trim()) {
                return;
            } else {
                setInputTratamiento(preguntaTratamiento?.current?.value?.trim());
            }
            if (takingMedication && !preguntaMedicamentos?.current?.value?.trim()) {
                return;
            } else {
                setInputMedicamentos(preguntaMedicamentos?.current?.value?.trim());
            }
            if (allergic && !preguntaAlergias?.current?.value?.trim()) {
                return;
            } else {
                setInputAlergias(preguntaAlergias?.current?.value?.trim());
            }
        }
        setStep(step + 1);
    };

    const prevStep = () => {
        if (!isAllDiseasesFilled()) {
            alert("Por favor, complete los detalles de todas las enfermedades seleccionadas antes de continuar.");
            return;
        }
        if (step == 2) {
            
            if (complications && !preguntaComplicaciones?.current?.value?.trim()) {
                return;
            } else {
                setInputComplicaciones(preguntaComplicaciones?.current?.value?.trim());
            }
            if (beingTreated && !preguntaTratamiento?.current?.value?.trim()) {
                return;
            } else {
                setInputTratamiento(preguntaTratamiento?.current?.value?.trim());
            }
            if (takingMedication && !preguntaMedicamentos?.current?.value?.trim()) {
                return;
            } else {
                setInputMedicamentos(preguntaMedicamentos?.current?.value?.trim());
            }
            if (allergic && !preguntaAlergias?.current?.value?.trim()) {
                return;
            } else {
                setInputAlergias(preguntaAlergias?.current?.value?.trim());
            }
        }
        setStep(step - 1);
    };

    const isAllDiseasesFilled = () => {
        return Object.values(selectedDiseases).every(disease => {
            return !disease.selected || (disease.text && disease.text.trim() !== '');
        });
    };

    if (isLoading) return <Spinner />
    if (loadingEnfermedades) return <Spinner />

    const consulta = datosConsultas.data;

    const StepOne = () => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-3">Datos del Paciente</h2>
            {/* Grid container */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Columna 1 */}
                <div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo:</label>
                        <p className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {consulta.cita.paciente.nombre_paciente + ' ' + consulta.cita.paciente.apellidos_paciente}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Edad:</label>
                        <p className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {consulta.cita.paciente.edad_paciente}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                        <p className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {consulta.cita.paciente.direccion_paciente}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tipo identificacion:</label>
                        <p className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {consulta.cita.paciente.identificacion.nombre_identificacion}
                        </p>
                    </div>
                </div>
                {/* Columna 2 */}
                <div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Género:</label>
                        <p className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {consulta.cita.paciente.genero_paciente === 'M' ? 'Masculino' : 'Femenino'}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Altura:</label>
                        <p className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {consulta.cita.paciente.altura_paciente} m
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Peso:</label>
                        <p className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {consulta.cita.paciente.peso_paciente} kg
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Numero identificacion:</label>
                        <p className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {consulta.cita.paciente.identificacion_paciente}
                        </p>
                    </div>
                </div>
            </div>
            {/* Concepto de la cita */}
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">Concepto de la Cita:</label>
                <textarea
                    disabled
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight h-24"
                    defaultValue={consulta.cita.concepto_cita}
                ></textarea>
            </div>
            <div className="flex justify-end">
                <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Siguiente
                </button>
            </div>
        </section>


    );

    const StepTwo = () => (
        <div>

            <section className="mb-8 p-6 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Historial Médico</h2>

                {/* Pregunta sobre complicaciones */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Ha presentado complicaciones?</label>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" checked={complications} onChange={() => setComplications(!complications)} className="mr-2" /> Sí
                        <input type="checkbox" checked={!complications} onChange={() => setComplications(!complications)} className="ml-4 mr-2" /> No
                    </div>
                    {complications && (
                        <div className="mb-4">

                            <label className="block text-gray-700 font-bold mb-2">¿Cuáles?</label>
                            <input
                                defaultValue={inputCompliaciones}
                                onBlur={(e) => setInputComplicaciones(e.target.value)}
                                ref={preguntaComplicaciones} type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required
                            />
                        </div>
                    )}
                </div>

                {/* Pregunta sobre tratamiento médico */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">¿Está siendo tratado por un médico actualmente?</label>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" checked={beingTreated} onChange={() => setBeingTreated(!beingTreated)} className="mr-2" /> Sí
                        <input type="checkbox" checked={!beingTreated} onChange={() => setBeingTreated(!beingTreated)} className="ml-4 mr-2" /> No
                    </div>
                    {beingTreated && (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">¿Para qué enfermedad?</label>
                            <input
                                defaultValue={inputTratamineto}
                                onBlur={(e) => setInputTratamiento(e.target.value)}
                                ref={preguntaTratamiento} type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                    )}
                </div>

                {/* Pregunta sobre medicamentos */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">¿Está tomando algún tipo de medicamento?</label>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" checked={takingMedication} onChange={() => setTakingMedication(!takingMedication)} className="mr-2" /> Sí
                        <input type="checkbox" checked={!takingMedication} onChange={() => setTakingMedication(!takingMedication)} className="ml-4 mr-2" /> No
                    </div>
                    {takingMedication && (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">¿Cuáles y con qué dosis?</label>
                            <input
                                defaultValue={inputMedicamentos}
                                onBlur={(e) => setInputMedicamentos(e.target.value)}
                                ref={preguntaMedicamentos} type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                    )}
                </div>

                {/* Pregunta sobre alergias a medicamentos */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">¿Es usted alérgico/a algún medicamento?</label>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" checked={allergic} onChange={() => setAllergic(!allergic)} className="mr-2" /> Sí
                        <input type="checkbox" checked={!allergic} onChange={() => setAllergic(!allergic)} className="ml-4 mr-2" /> No
                    </div>
                    {allergic && (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">¿Cuáles?</label>
                            <input
                                defaultValue={inputAlergias}
                                onBlur={(e) => setInputAlergias(e.target.value)}
                                ref={preguntaAlergias} type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                    )}
                </div>


            </section>
            <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                    Atrás
                </button>
                <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                    Siguiente
                </button>
            </div>
        </div>
    );

    const StepThree = () => {

        return (
            <div>

                <section className="mb-8 p-6 bg-white shadow rounded">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Historial de Enfermedades</h2>
                    <div className="mb-6">
                        {datosEnfermedades && datosEnfermedades.data.map((enfermedad) => (
                            <div key={enfermedad.idenfermedades} className="mb-3">
                                <label className="block text-gray-700 font-bold mb-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedDiseases[enfermedad.idenfermedades]?.selected || false}
                                        onChange={() => handleDiseaseChange(enfermedad.idenfermedades)}
                                        className="mr-2"
                                    />
                                    {enfermedad.nombre_enfermedad}
                                </label>
                                {selectedDiseases[enfermedad.idenfermedades]?.selected && (
                                    <input
                                        required
                                        type="text"
                                        placeholder={`Detalles de ${enfermedad.nombre_enfermedad}`}
                                        defaultValue={selectedDiseases[enfermedad.idenfermedades]?.text || ''}
                                        onBlur={(e) => handleInputTextChange(enfermedad.idenfermedades, e.target.value)}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />

                                )}
                            </div>
                        ))}

                    </div>


                </section>
                <div className="flex justify-between">
                    <button
                        onClick={prevStep}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    >
                        Atrás
                    </button>
                    <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                        Siguiente
                    </button>
                </div>
            </div>
        )
    };

    const StepFour = () => (
        <div>
            <section className="mb-8 p-6 bg-white shadow rounded">
                <h2 className="text-lg font-semibold mb-3">Examen Clínico Extra Oral</h2>
                {/* 2 labels con selects  */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* Columna 1 */}
                    <div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Cabeza:</label>
                            <select required defaultValue={inputValues.idexamen_cabeza} onChange={handleInputChange} name="idexamen_cabeza" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">--Selecciona--</option>
                                {examenCabeza.map(examenCabez => (
                                    <option key={examenCabez.idcabeza} value={examenCabez.idcabeza}>{examenCabez.nombre_cabeza}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Columna 2 */}
                    <div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Cara:</label>
                            <select required defaultValue={inputValues.idexamen_cara} onChange={handleInputChange} name="idexamen_cara" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">--Selecciona--</option>
                                {examenCara.map(examenCara => (
                                    <option key={examenCara.idcara} value={examenCara.idcara}>{examenCara.nombre_cara}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/* 2 labels con selects  */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* Columna 1 */}
                    <div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2">ATM:</label>
                            <select required defaultValue={inputValues.idexamen_atm} onChange={handleInputChange} name="idexamen_atm" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">--Selecciona--</option>
                                {examenATM.map(examenATM => (
                                    <option key={examenATM.idatm} value={examenATM.idatm}>{examenATM.nombre_atm}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Columna 2 */}
                    <div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Ganglios:</label>
                            <select required defaultValue={inputValues.idexamen_ganglios} onChange={handleInputChange} name="idexamen_ganglios" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">--Selecciona--</option>
                                {examenGanglios.map(examenGanglio => (
                                    <option key={examenGanglio.idganglios} value={examenGanglio.idganglios}>{examenGanglio.nombre_ganglios}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* Columna 1 */}
                    <div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Labios:</label>
                            <select required defaultValue={inputValues.idexamen_labios} onChange={handleInputChange} name="idexamen_labios" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">--Selecciona--</option>
                                {examenLabios.map(examenLabio => (
                                    <option key={examenLabio.idlabios} value={examenLabio.idlabios}>{examenLabio.nombre_labios}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Columna 2 */}
                    <div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Señas particulares:</label>
                            <select required defaultValue={inputValues.idexamen_señasp} onChange={handleInputChange} name="idexamen_señasp" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">--Selecciona--</option>
                                {examenSeñas.map(examenSeña => (
                                    <option key={examenSeña.idseñas} value={examenSeña.idseñas}>{examenSeña.nombre_señasp}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                        Enviar
                    </button>
                </div>
            </section>
            <div className="flex justify-between">
                <button
                    onClick={prevStep}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    Atrás
                </button>

            </div>
        </div>
    );

    const getDiseasesData = () => {
        // console.log(consulta);
        return Object.entries(selectedDiseases)
            .filter(([_, diseaseData]) => diseaseData.selected && diseaseData.text)
            .map(([diseaseId, diseaseData]) => {
                return {
                    idconsulta: consulta.idconsulta,
                    idcliente: consulta.cita.cliente.idcliente,
                    idpaciente: consulta.cita.paciente.idpaciente,
                    idenfermedad: diseaseId,
                    tratamiento_enfermedad: diseaseData.text.trim(), // Asegurarse de que no hay espacios en blanco
                };
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();



        // Obtiene los datos de las enfermedades
        const diseasesData = getDiseasesData();
        const preguntas = {
            respuesta1: inputCompliaciones ? inputCompliaciones : '',
            respuesta2: inputTratamineto ? inputTratamineto : '',
            respuesta3: inputMedicamentos ? inputMedicamentos : '',
            respuesta4: inputAlergias ? inputAlergias : '',
        }
        console.log(inputValues);
        handleSubmitHistorial(diseasesData, preguntas, inputValues, consulta.cita.paciente.idpaciente, consulta.idconsulta);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepOne />;
            case 2:
                return <StepTwo />;
            case 3:
                return <StepThree />;
            case 4:
                return <StepFour />;
            default:
                return <StepOne />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white shadow-md rounded px-8 pt-6 pb-8">
                {renderStep()}
            </form>
        </div>
    );
}
