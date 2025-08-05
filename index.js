import React, { useState, useEffect } from 'react';
import { ChevronDown, FileText, Briefcase, Users, BarChart2, Shield, Settings, DollarSign, BookOpen, Handshake, CheckCircle } from 'lucide-react';

// The main application component
const App = () => {
  // State to manage the open/close state of each section
  const [openSections, setOpenSections] = useState({});
  // State to manage the checked state of each checklist item
  const [checkedItems, setCheckedItems] = useState({});
  // State to track if all items are checked
  const [isCompleted, setIsCompleted] = useState(false);

  // Define the document sections and their items
  const documentSections = [
    {
      id: 'legal',
      title: '1. Documentación Legal y Reglamentaria',
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      items: [
        'Estatuto jurídico de la organización (razón social, permisos, constitución legal).',
        'Registro sanitario y autorizaciones del Ministerio de Salud Pública (MSP).',
        'Reglamento interno y manuales de funciones.',
        'Certificaciones de habilitación de servicios de salud.',
      ],
    },
    {
      id: 'planning',
      title: '2. Planificación Institucional',
      icon: <BookOpen className="w-5 h-5 text-green-500" />,
      items: [
        'Plan Estratégico Institucional anterior (si existe): visión, misión, objetivos, metas.',
        'Matriz de planificación vigente (POA – Plan Operativo Anual).',
        'Misión, visión y valores institucionales.',
        'Manual de procesos y procedimientos internos (MAPRO).',
        'Modelo de atención al cliente.',
      ],
    },
    {
      id: 'organization',
      title: '3. Información Organizacional y Administrativa',
      icon: <Briefcase className="w-5 h-5 text-purple-500" />,
      items: [
        'Organigrama actualizado.',
        'Base de datos del personal o nómina (médico, administrativo, técnico).',
        'Flujogramas de atención y prestación de servicios.',
      ],
    },
    {
      id: 'environment',
      title: '4. Análisis de Entorno y Contexto (OPE)',
      icon: <BarChart2 className="w-5 h-5 text-red-500" />,
      items: [
        'Análisis político, económico, social, tecnológico, ambiental y legal (análisis PESTEL).',
        'Normativas vigentes del MSP, CNE, ARCSA, IECS, etc.',
        'Estadísticas locales y nacionales de salud (INEC, MSP).',
        'Lineamientos del Plan Decenal de Salud 2022–2031.',
        'Objetivos de Desarrollo Sostenible (ODS), especialmente el ODS 3 (salud y bienestar).',
      ],
    },
    {
      id: 'clinical',
      title: '5. Información de Gestión Clínica y de Servicios',
      icon: <Shield className="w-5 h-5 text-yellow-500" />,
      items: [
        'Portafolio de servicios (centro de diagnóstico, hospitalización, emergencia, quirófano, consulta externa, etc.).',
        'Estadísticas de producción: atenciones, exámenes realizados, demanda y oferta para cada grupo.',
        'Tiempos promedio de atención, tasa de satisfacción del cliente, y tasa de utilización de equipos y recursos.',
        'Cumplimiento de estándares de calidad y seguridad del paciente (Normas INEN, MSP, ISO si aplica).',
      ],
    },
    {
      id: 'finance',
      title: '6. Finanzas y Recursos',
      icon: <DollarSign className="w-5 h-5 text-teal-500" />,
      items: [
        'Presupuesto institucional anual.',
        'Estados financieros recientes (balance general, flujo de caja).',
        'Ingresos por servicios y convenios (particulares, aseguradoras, MSP, IESS).',
        'Costos de operación y mantenimiento.',
      ],
    },
    {
      id: 'tech',
      title: '7. Tecnología y Sistemas de Información',
      icon: <Settings className="w-5 h-5 text-indigo-500" />,
      items: [
        'Infraestructura tecnológica (sistemas HIS, LIS, RIS, ERP, etc.).',
        'Equipamiento médico y su mantenimiento.',
        'Nivel de digitalización del expediente clínico.',
        'Protocolos de ciberseguridad y manejo de datos de pacientes. (Especial énfasis)',
      ],
    },
    {
      id: 'quality',
      title: '8. Información de Gestión de Calidad y Evaluación',
      icon: <CheckCircle className="w-5 h-5 text-cyan-500" />,
      items: [
        'Informes de auditorías internas o externas (sanitarias, financieras, de calidad).',
        'Indicadores de gestión institucional (KPI clínicos, administrativos y financieros).',
        'Plan de mejora continua y planes de contingencia.',
        'Resultados de encuestas de satisfacción del paciente.',
        'Evaluaciones de riesgos sanitarios y ocupacionales.',
      ],
    },
    {
      id: 'human-resources',
      title: '9. Gestión de Talento Humano',
      icon: <Users className="w-5 h-5 text-orange-500" />,
      items: [
        'Políticas de formación continua y capacitación.',
        'Evaluaciones de desempeño y clima organizacional.',
        'Manuales de inducción, bioseguridad y salud ocupacional.',
        'Manual de funciones por procesos.',
      ],
    },
    {
      id: 'external',
      title: '10. Relaciones Externas e Interinstitucionales',
      icon: <Handshake className="w-5 h-5 text-rose-500" />,
      items: [
        'Convenios de cooperación (con MSP, IESS, municipios, universidades, otros).',
        'Participación en redes de salud o territorios de salud.',
        'Reportes enviados a entidades reguladoras.',
      ],
    },
  ];

  // Function to toggle the open state of a section
  const toggleSection = (id) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Function to handle checkbox changes
  const handleCheck = (id) => {
    setCheckedItems(prev => {
      const newCheckedItems = {
        ...prev,
        [id]: !prev[id],
      };
      return newCheckedItems;
    });
  };

  // Effect to check if all items are completed
  useEffect(() => {
    const allItems = documentSections.flatMap(section =>
      section.items.map((item, index) => `${section.id}-${index}`)
    );
    const allChecked = allItems.every(id => checkedItems[id]);
    setIsCompleted(allChecked);
  }, [checkedItems]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight tracking-wider">
            MEDILAB
          </h1>
          <h2 className="text-xl sm:text-2xl mt-2 font-semibold">
            DOCUMENTACIÓN BASE PARA UN DIAGNÓSTICO ESTRATÉGICO EN SERVICIOS DE SALUD
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 italic">
            Marca las casillas a medida que recopiles los documentos.
          </p>
        </header>

        {/* Completion message */}
        {isCompleted && (
          <div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 p-4 rounded-xl flex items-center justify-center space-x-3 mb-6 shadow-md">
            <CheckCircle className="w-6 h-6 animate-pulse" />
            <span className="font-bold text-lg">
              ¡Felicidades! Has completado la lista de verificación.
            </span>
          </div>
        )}

        {/* Render each section */}
        <div className="space-y-4">
          {documentSections.map((section) => (
            <div key={section.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-600">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-lg sm:text-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div className="flex items-center space-x-3">
                  {section.icon}
                  <span>{section.title}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform duration-300 ${openSections[section.id] ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>

              {openSections[section.id] && (
                <div className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-600">
                  <ul className="space-y-3">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <input
                          type="checkbox"
                          id={`${section.id}-${index}`}
                          checked={!!checkedItems[`${section.id}-${index}`]}
                          onChange={() => handleCheck(`${section.id}-${index}`)}
                          className="mt-1 w-5 h-5 rounded-md text-indigo-600 bg-gray-200 dark:bg-gray-500 border-gray-300 dark:border-gray-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 accent-indigo-600 dark:accent-indigo-400 transition-colors duration-200 cursor-pointer"
                        />
                        <label
                          htmlFor={`${section.id}-${index}`}
                          className={`ml-3 text-base sm:text-lg flex-1 cursor-pointer transition-colors duration-200 ${checkedItems[`${section.id}-${index}`] ? 'text-gray-400 dark:text-gray-500 line-through' : ''}`}
                        >
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
