import React, { useState } from "react";

const Home = () => {
  // state que guarda la lista de tareas
  const [tasks, setTasks] = useState([]);

  // state que guarda lo que el usuario escribe en el input
  const [inputValue, setInputValue] = useState("");

  // funcionn para actualizar el estado del input cada vez que se escribe
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // funcion para añadir una tarea
  const addTask = () => {
    // formateo quitando espacios al principio y al final
    const text = inputValue.trim();

    // si no hay texto no hacemos nada
    if (!text) return;

    // hacemos una copia del array actual (sin cambiar el estado directamente)
    const copy = [...tasks];

    // añadimos la nueva tarea al final
    copy.push(text);

    // update al estado con la nueva lista
    setTasks(copy);

    // limpiamos el input para que quede vacio
    setInputValue("");
  };

  // funcion para eliminar una tarea por su indice
  const deleteTask = (indexDelete) => {
    // copiamos el array actual
    const copy = [...tasks];

    // quitamos 1 elemento en la posicion indexToDelete
    copy.splice(indexDelete, 1);

    // hacemos update al estado con la lista nueva
    setTasks(copy);
  };

  // cuando el usuario presiona una tecla dentro del input
  const handleKeyDown = (e) => {
    // si la tecla es "Enter" añadimos la tarea
    if (e.key === "Enter") addTask();
  };

  return (
    // contenedor con fondo gris claro
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* titulo */} 
        <div className="text-center mb-4">
          <h1 className="display-1 fw-light text-danger opacity-25 mb-0">
            todos
          </h1>
        </div>

        {/* contenedor de la tarjeta */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {/* box blanco con borde y sombra */}
            <div className="bg-white shadow-sm border">
              {/* Input para escribir tareas */}
              <div className="border-bottom p-3">
                <input
                  className="form-control form-control-lg border-0 shadow-none fw-light"
                  type="text"
                  placeholder="What needs to be done?"
                  value={inputValue}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>

              {/* lwista de tareas */}
              <ul className="list-group list-group-flush">
                {/* mostramos el mensaje "no tasks, add a task" si no hay tareas */}
                {tasks.length === 0 ? (
                  <li className="list-group-item text-muted fst-italic fw-light fs-5 py-3">
                    No tasks, add a task
                  </li>
                ) : (
                  // si hay tareas las corremos una por una con map y las mostramos
                  tasks.map((task, index) => (
                    <li
                      // key para identificar cada ttask de la lista
                      key={`${task}-${index}`}
                      className="list-group-item d-flex justify-content-between align-items-center py-3"
                    >
                    
                      <span className="fw-light fs-4">{task}</span>

                      {/* boton (es una X) para borrar */} 
                      <button
                        type="button"
                        className="btn btn-link text-danger text-decoration-none p-0 fs-3 fw-light"
                        onClick={() => deleteTask(index)}
                        title="Delete"
                      >
                        X
                      </button>
                    </li>
                  ))
                )}
              </ul>

              {/* contador de tareas */}
              <div className="px-3 py-2 small text-secondary">
                {tasks.length} item{tasks.length === 1 ? "" : "s"} left
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
