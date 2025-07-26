document.addEventListener('DOMContentLoaded', () => {

    // --- Definición de Datos de la Malla Curricular ---
    // Se definen todos los ramos con un ID único, nombre, semestre y sus requisitos.
    // El ID es crucial para la lógica de prerrequisitos.
    const mallaData = [
        // Semestre 1
        { id: 'ingles-i', nombre: 'Inglés I', semestre: 1, requisitos: [] },
        { id: 'taller-expresion', nombre: 'Taller de Expresión Oral y Escrita', semestre: 1, requisitos: [] },
        { id: 'estrategias-aprendizaje', nombre: 'Estrategias de Aprendizaje Universitario', semestre: 1, requisitos: [] },
        { id: 'biologia', nombre: 'Biología', semestre: 1, requisitos: [] },
        { id: 'pensamiento-filosofico', nombre: 'Pensamiento Filosófico', semestre: 1, requisitos: [] },
        { id: 'actividades-culturales', nombre: 'Actividades Culturales y Deportivas', semestre: 1, requisitos: [] },
        { id: 'embriologia-genetica', nombre: 'Embriología y Genética', semestre: 1, requisitos: [] },
        { id: 'primeros-auxilios-cp1', nombre: 'Primeros Auxilios y Soporte Vital Básico (CP1)', semestre: 1, requisitos: [] },
        // Semestre 2
        { id: 'ingles-ii', nombre: 'Inglés II', semestre: 2, requisitos: ['ingles-i'] },
        { id: 'globalizacion', nombre: 'Globalización y Realidad Nacional', semestre: 2, requisitos: [] },
        { id: 'metodologia-investigacion-cientifica', nombre: 'Metodología de la Investigación Científica', semestre: 2, requisitos: [] },
        { id: 'desarrollo-personal', nombre: 'Desarrollo Personal', semestre: 2, requisitos: [] },
        { id: 'razonamiento-matematico', nombre: 'Razonamiento Matemático', semestre: 2, requisitos: [] },
        { id: 'histologia', nombre: 'Histología', semestre: 2, requisitos: [] },
        { id: 'soporte-vital-trauma-cp2', nombre: 'Soporte Vital de Trauma Prehospitalario (CP2)', semestre: 2, requisitos: [] },
        // Semestre 3
        { id: 'ingles-iii', nombre: 'Inglés III', semestre: 3, requisitos: ['ingles-ii'] },
        { id: 'liderazgo-responsabilidad-social', nombre: 'Taller de Liderazgo y Responsabilidad Social', semestre: 3, requisitos: [] },
        { id: 'medio-ambiente-salud', nombre: 'Medio Ambiente y Salud', semestre: 3, requisitos: [] },
        { id: 'innovacion-emprendimiento', nombre: 'Innovación y Emprendimiento', semestre: 3, requisitos: [] },
        { id: 'bioetica', nombre: 'Bioética en el Ejercicio Profesional', semestre: 3, requisitos: [] },
        { id: 'anatomia-humana', nombre: 'Anatomía Humana', semestre: 3, requisitos: ['biologia', 'embriologia-genetica', 'histologia'] },
        { id: 'fisiologia-i', nombre: 'Fisiología I', semestre: 3, requisitos: ['biologia', 'embriologia-genetica', 'histologia'] },
        // Semestre 4
        { id: 'fisiologia-ii', nombre: 'Fisiología II', semestre: 4, requisitos: ['fisiologia-i'] },
        { id: 'bioquimica-aplicada', nombre: 'Bioquímica Aplicada a la Medicina', semestre: 4, requisitos: ['biologia'] },
        { id: 'nutricion-medica', nombre: 'Nutrición Médica', semestre: 4, requisitos: ['biologia'] },
        { id: 'epidemiologia', nombre: 'Epidemiología', semestre: 4, requisitos: ['metodologia-investigacion-cientifica'] },
        { id: 'metodologia-investigacion-i', nombre: 'Metodología de la Investigación I', semestre: 4, requisitos: ['metodologia-investigacion-cientifica'] },
        { id: 'soporte-vital-avanzado-cp3', nombre: 'Soporte Vital Avanzado (CP3)', semestre: 4, requisitos: ['soporte-vital-trauma-cp2'] },
        // Semestre 5
        { id: 'microbiologia-parasitologia', nombre: 'Microbiología y Parasitología', semestre: 5, requisitos: ['biologia', 'histologia'] },
        { id: 'fisiopatologia-clinica', nombre: 'Fisiopatología Clínica', semestre: 5, requisitos: ['fisiologia-i', 'fisiologia-ii'] },
        { id: 'medicina-alternativa', nombre: 'Medicina Alternativa y Complementaria', semestre: 5, requisitos: ['biologia', 'fisiologia-i', 'fisiologia-ii'] },
        { id: 'patologia-general-especial', nombre: 'Patología General y Especial', semestre: 5, requisitos: ['fisiologia-ii'] },
        // Semestre 6
        { id: 'farmacologia', nombre: 'Farmacología', semestre: 6, requisitos: ['fisiopatologia-clinica'] },
        { id: 'semiologia', nombre: 'Semiología', semestre: 6, requisitos: ['fisiopatologia-clinica'] },
        { id: 'diagnostico-imagenes', nombre: 'Diagnóstico por Imágenes', semestre: 6, requisitos: [] },
        { id: 'metodologia-investigacion-ii', nombre: 'Metodología de la Investigación II', semestre: 6, requisitos: ['epidemiologia', 'metodologia-investigacion-i'] },
        // Semestre 7
        { id: 'medicina-i', nombre: 'Medicina I', semestre: 7, requisitos: ['semiologia'] },
        { id: 'patologia-clinica', nombre: 'Patología Clínica', semestre: 7, requisitos: ['patologia-general-especial'] },
        { id: 'psicopatologia', nombre: 'Psicopatología', semestre: 7, requisitos: ['semiologia'] },
        { id: 'apoyo-vital-avanzado-trauma-cp4', nombre: 'Apoyo Vital Avanzado en Trauma (CP4)', semestre: 7, requisitos: ['soporte-vital-avanzado-cp3'] },
        // Semestre 8
        { id: 'cirugia-i', nombre: 'Cirugía I', semestre: 8, requisitos: ['medicina-i'] },
        { id: 'medicina-ii', nombre: 'Medicina II', semestre: 8, requisitos: ['medicina-i'] },
        { id: 'plan-tesis-i', nombre: 'Plan de Tesis I', semestre: 8, requisitos: ['metodologia-investigacion-ii'] },
        // Semestre 9
        { id: 'cirugia-ii', nombre: 'Cirugía II', semestre: 9, requisitos: ['cirugia-i'] },
        { id: 'gestion-salud', nombre: 'Gestión en Salud', semestre: 9, requisitos: ['epidemiologia'] },
        { id: 'medicina-fisica-rehabilitacion', nombre: 'Medicina Física y Rehabilitación', semestre: 9, requisitos: ['cirugia-i'] },
        { id: 'salud-publica-comunitaria', nombre: 'Salud Pública y Medicina Comunitaria', semestre: 9, requisitos: ['epidemiologia'] },
        // Semestre 10
        { id: 'medicina-iii', nombre: 'Medicina III', semestre: 10, requisitos: ['medicina-ii'] },
        { id: 'medicina-legal-forense', nombre: 'Medicina Legal y Forense', semestre: 10, requisitos: [] },
        { id: 'obstetricia-ginecologia', nombre: 'Obstetricia y Ginecología', semestre: 10, requisitos: ['cirugia-ii'] },
        { id: 'plan-tesis-ii', nombre: 'Plan de Tesis II', semestre: 10, requisitos: ['plan-tesis-i'] },
        // Semestre 11
        { id: 'pediatria', nombre: 'Pediatría', semestre: 11, requisitos: ['obstetricia-ginecologia'] },
        { id: 'geriatria', nombre: 'Geriatría', semestre: 11, requisitos: ['medicina-iii'] },
        { id: 'emergencias-desastres', nombre: 'Emergencias y Desastres', semestre: 11, requisitos: ['apoyo-vital-avanzado-trauma-cp4', 'cirugia-ii', 'medicina-iii'] },
        { id: 'bioestadistica-demografia', nombre: 'Bioestadística y Demografía', semestre: 11, requisitos: ['plan-tesis-ii'] },
        // Semestre 12
        { id: 'externado-medicina', nombre: 'Externado Medicina', semestre: 12, requisitos: ['pediatria', 'geriatria', 'emergencias-desastres', 'bioestadistica-demografia'] },
        { id: 'externado-cirugia', nombre: 'Externado Cirugía', semestre: 12, requisitos: ['pediatria', 'geriatria', 'emergencias-desastres', 'bioestadistica-demografia'] },
        { id: 'externado-ginecologia', nombre: 'Externado Obstetricia-Ginecología', semestre: 12, requisitos: ['pediatria', 'geriatria', 'emergencias-desastres', 'bioestadistica-demografia'] },
        { id: 'externado-pediatria', nombre: 'Externado Pediatría', semestre: 12, requisitos: ['pediatria', 'geriatria', 'emergencias-desastres', 'bioestadistica-demografia'] },
        { id: 'ejecucion-tesis', nombre: 'Ejecución de Tesis', semestre: 12, requisitos: ['bioestadistica-demografia'] },
        // Semestre 13
        { id: 'internado-medicina', nombre: 'Internado Medicina', semestre: 13, requisitos: ['externado-medicina', 'externado-cirugia', 'externado-ginecologia', 'externado-pediatria', 'ejecucion-tesis'] },
        { id: 'internado-cirugia', nombre: 'Internado Cirugía', semestre: 13, requisitos: ['externado-medicina', 'externado-cirugia', 'externado-ginecologia', 'externado-pediatria', 'ejecucion-tesis'] },
        // Semestre 14
        { id: 'internado-ginecologia', nombre: 'Internado Obstetricia-Ginecología', semestre: 14, requisitos: ['externado-medicina', 'externado-cirugia', 'externado-ginecologia', 'externado-pediatria', 'ejecucion-tesis'] },
        { id: 'internado-pediatria', nombre: 'Internado Pediatría', semestre: 14, requisitos: ['externado-medicina', 'externado-cirugia', 'externado-ginecologia', 'externado-pediatria', 'ejecucion-tesis'] },
    ];

    const mallaContainer = document.getElementById('malla-container');
    const modal = document.getElementById('modal-requisitos');
    const closeModal = document.getElementById('close-modal');
    const listaRequisitos = document.getElementById('lista-requisitos');
    const resetButton = document.getElementById('reset-button');
    const LOCAL_STORAGE_KEY = 'ramosAprobadosMedicina';

    // --- Funciones para manejar el Local Storage ---
    
    // Obtiene la lista de ramos aprobados desde el Local Storage.
    // Si no existe, devuelve un array vacío.
    const getAprobados = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    // Guarda la lista de ramos aprobados en el Local Storage.
    const saveAprobados = (aprobados) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(aprobados));

    // --- Lógica Principal ---

    // Dibuja la malla curricular en el DOM.
    const renderMalla = () => {
        mallaContainer.innerHTML = ''; // Limpia el contenedor
        const maxSemestre = Math.max(...mallaData.map(r => r.semestre));

        for (let i = 1; i <= maxSemestre; i++) {
            const semestreColumna = document.createElement('div');
            semestreColumna.className = 'semestre-columna';
            
            const semestreTitulo = document.createElement('div');
            semestreTitulo.className = 'semestre-titulo';
            semestreTitulo.textContent = `Semestre ${i}`;
            semestreColumna.appendChild(semestreTitulo);

            const ramosDelSemestre = mallaData.filter(r => r.semestre === i);
            ramosDelSemestre.forEach(ramo => {
                const ramoDiv = document.createElement('div');
                ramoDiv.className = 'ramo';
                ramoDiv.textContent = ramo.nombre;
                ramoDiv.dataset.id = ramo.id; // Asigna el ID del ramo al elemento
                semestreColumna.appendChild(ramoDiv);
            });

            mallaContainer.appendChild(semestreColumna);
        }
    };

    // Actualiza el estado visual de todos los ramos (aprobado, bloqueado, disponible).
    const actualizarEstadoVisual = () => {
        const aprobados = getAprobados();
        const todosLosRamos = document.querySelectorAll('.ramo');

        todosLosRamos.forEach(ramoDiv => {
            const ramoId = ramoDiv.dataset.id;
            const ramoData = mallaData.find(r => r.id === ramoId);
            
            // Resetear clases
            ramoDiv.classList.remove('aprobado', 'bloqueado');

            // Verificar si el ramo está aprobado
            if (aprobados.includes(ramoId)) {
                ramoDiv.classList.add('aprobado');
                return; // Si está aprobado, no puede estar bloqueado
            }

            // Verificar si el ramo está bloqueado por falta de requisitos
            const requisitos = ramoData.requisitos;
            const requisitosCumplidos = requisitos.every(reqId => aprobados.includes(reqId));

            if (!requisitosCumplidos) {
                ramoDiv.classList.add('bloqueado');
            }
        });
    };

    // Muestra el modal con la lista de requisitos faltantes.
    const mostrarModalRequisitos = (ramoId) => {
        const aprobados = getAprobados();
        const ramoData = mallaData.find(r => r.id === ramoId);
        const requisitosFaltantes = ramoData.requisitos.filter(reqId => !aprobados.includes(reqId));
        
        // Limpia la lista anterior
        listaRequisitos.innerHTML = '';

        requisitosFaltantes.forEach(reqId => {
            const reqData = mallaData.find(r => r.id === reqId);
            const li = document.createElement('li');
            li.textContent = reqData.nombre;
            listaRequisitos.appendChild(li);
        });

        modal.style.display = 'flex';
    };

    // Maneja el evento de clic en un ramo.
    const handleRamoClick = (e) => {
        const ramoDiv = e.target.closest('.ramo');
        if (!ramoDiv) return; // Si el clic no fue en un ramo, no hacer nada

        const ramoId = ramoDiv.dataset.id;
        
        if (ramoDiv.classList.contains('bloqueado')) {
            mostrarModalRequisitos(ramoId);
            return;
        }

        let aprobados = getAprobados();
        if (aprobados.includes(ramoId)) {
            // Si ya está aprobado, se desaprueba (se quita de la lista)
            aprobados = aprobados.filter(id => id !== ramoId);
        } else {
            // Si no está aprobado, se aprueba (se añade a la lista)
            aprobados.push(ramoId);
        }
        
        saveAprobados(aprobados);
        actualizarEstadoVisual(); // Re-evaluar el estado de todos los ramos
    };
    
    // --- Event Listeners ---

    // Clic en un ramo (usando delegación de eventos)
    mallaContainer.addEventListener('click', handleRamoClick);

    // Cerrar el modal
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Botón para reiniciar el progreso
    resetButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres borrar todo tu progreso? Esta acción no se puede deshacer.')) {
            saveAprobados([]); // Guarda un array vacío
            actualizarEstadoVisual(); // Actualiza la vista
        }
    });

    // --- Inicialización ---
    renderMalla();
    actualizarEstadoVisual();
});
