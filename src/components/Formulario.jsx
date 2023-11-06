import {useState, useEffect} from 'react'
import Error from './Error';
import Paciente from './Paciente';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)
  // set---- esta es la funcion modificadora

  useEffect(()=>{
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])


  // Generar id aleatoria para solucionar el problema de la key,y que no se repitan objetos

  const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return fecha + random
  }
    


  //Reglas Hooks
  /* 
  * Los hooks se debe colocar en la parte superior de tus componentes+
  * No se deben colocar dentro de condicioles, tampoco despues de un return 
  */

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validacion del Formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('Hay almenos un campo vacio');
      setError(true)
      return
    }
    setError(false)

    //Objeto de paciente
    const objetoPaciente = {
      nombre, 
      propietario,
      email,
      fecha,
      sintomas
    }


    if(paciente.id){
      // Editando el Registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id 
        ? objetoPaciente : pacienteState)

        setPacientes(pacientesActualizados)
        setPaciente({})
    } else {
      // Nuevo Registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }
    // console.log(objetoPaciente)
    

    // Reiniciar el form

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }


  return (
    <div className="md:w-1/2 lg:w-2/5 md:h-screen">
      <h2 className="font-black text-3xl text-center mt-5 ">
        Seguimiento Pacientes
      </h2>
      <p className="text-lg mt-5 mb-10 text-center">
        {" "}
        Añade pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
      >
        {error && 
        <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700y uppercase font-bold "
          >
            Nombre Mascota
          </label>
          <input
            type="text"
            id="mascota"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700y uppercase font-bold "
          >
            Nombre Propietario
          </label>
          <input
            type="text"
            id="propietario"
            placeholder="Nombre de propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700y uppercase font-bold "
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700y uppercase font-bold "
          >
            Alta
          </label>
          <input
            type="Date"
            id="alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700y uppercase font-bold "
          >
            Alta
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value) }
          ></textarea>
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
          hover:bg-indigo-700 cursor-pointer transition-opacity"
          value={paciente.id ? 'Editar Paciente':'Agregar Paciente'}
        />
      </form>
    </div>
  );
};

export default Formulario;
