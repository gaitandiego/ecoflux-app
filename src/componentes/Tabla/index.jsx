import React, { useRef, useEffect } from 'react';
import MaterialTable, { MTableAction, MTableToolbar } from "@material-table/core";
import Loader from '../Common/Loader';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { downloadExcel } from "react-export-table-to-excel";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Tabla = ({ columns, data, actions, title, cargando, components, CuentasFiltros, setFilteredData, actionsColumnIndex = -1 }) => {

    const handleDownloadExcel = () => {

        const header = columns
            .filter(column => column.field) // Filtra solo los elementos con la propiedad "field"
            .map(column => column.field);

        let dataExport = []
        data.map((item) => {
            let items = new Object();
            columns.map(col => {
                if (col.title !== '#') {
                    items[col.field] = item[col.field]
                }
            })
            dataExport.push(items)
        })

        downloadExcel({
            fileName: "react-export-table-to-excel -> downloadExcel method",
            sheet: "react-export-table-to-excel",
            tablePayload: {
                header,
                body: dataExport,
            },
        });

    }

    return (
        <>
            {cargando ?
                <div className="cargando-view">
                    <Loader message="Loading..." />
                </div>

                :
                <>
                    <MaterialTable
                        columns={columns}
                        data={data}
                        title={title}
                        actions={actions}
                        style={{ padding: '12px' }}

                        localization={{
                            body: {
                                emptyDataSourceMessage: 'No hay datos por mostrar',
                                addTooltip: 'Añadir',
                                deleteTooltip: 'Eliminar',
                                editTooltip: 'Editar',
                                filterRow: {
                                    filterTooltip: 'Filtrar',
                                },
                                editRow: {
                                    deleteText: '¿Segura(o) que quiere eliminar?',
                                    cancelTooltip: 'Cancelar',
                                    saveTooltip: 'Guardar',
                                },
                            },
                            grouping: {
                                placeholder: "Arrastre un encabezado aquí para agrupar",
                                groupedBy: 'Agrupado por',
                            },
                            header: {
                                actions: 'Acciones',
                            },
                            pagination: {
                                firstAriaLabel: 'Primera página',
                                firstTooltip: 'Primera página',
                                labelRowsSelect: '{from}-{to} de {count}',
                                labelRowsPerPage: 'Filas por página:',
                                lastAriaLabel: 'Ultima página',
                                lastTooltip: 'Ultima página',
                                nextAriaLabel: 'Pagina siguiente',
                                nextTooltip: 'Pagina siguiente',
                                previousAriaLabel: 'Pagina anterior',
                                previousTooltip: 'Pagina anterior',
                                labelRows: 'filas'
                            },
                            toolbar: {
                                addRemoveColumns: 'Agregar o eliminar columnas',
                                exportAriaLabel: 'Exportar',
                                exportName: 'Exportar a CSV',
                                exportTitle: 'Exportar',
                                nRowsSelected: '{0} filas seleccionadas',
                                searchPlaceholder: 'Buscar',
                                searchTooltip: 'Buscar',
                                showColumnsAriaLabel: 'Mostrar columnas',
                                showColumnsTitle: 'Mostrar columnas',
                            },
                        }}
                        components={{
                            Action: props => {
                                if (props.action.validation) {
                                    const result = props.action.validation(props.data)
                                    if (result) return <MTableAction {...props} />
                                    return null
                                }
                                return <MTableAction {...props} />


                            },
                            Toolbar: props => (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    {/* Renderiza el botón personalizado */}

                                    {/* Renderiza la barra de herramientas predeterminada de Material-Table */}
                                    <div style={{ flex: 14 }}>
                                        <MTableToolbar {...props} />
                                    </div>
                                    <div style={{ flex: 1 }} className="d-none d-sm-block">
                                        <button onClick={() => { handleDownloadExcel() }} style={{ backgroundColor: '#10ac84', borderRadius: 20, borderStyle: 'none', padding: 10, width: 70, display: 'flex' }}>
                                            <i className="fa-solid fa-file-excel icon" style={{ color: 'white', fontSize: 17, marginRight: 5 }} ></i><span style={{ color: 'white' }}>Excel</span>
                                        </button>
                                    </div>
                                </div>
                                // <Row>
                                //     <Col xs={10} sm={12} md={11}>
                                //         <MTableToolbar {...props} />
                                //     </Col>
                                //     <Col xs={2} sm={12} md={1}>
                                //     <button onClick={() => {handleDownloadExcel()}} style={{backgroundColor: '#10ac84', borderRadius: 20, borderStyle: 'none', padding: 10, width: 70, display: 'flex'}}>
                                //          <i class="fa-solid fa-file-excel icon" style={{color: 'white', fontSize: 17, marginRight: 5}} ></i><span style={{color: 'white'}}>Excel</span>
                                //     </button>
                                //     </Col>
                                // </Row>
                            ),

                        }}

                        onFilterChange={(appliedFilters) => {

                            if (CuentasFiltros) {
                                let filtros = []
                                //const filtered = data.filter(row => row.tableData.vendedor === 'Tecnosoluciones Comercio'); // Modifica este filtro según la estructura de tus datos
                                console.log('appliedFilters', appliedFilters)
                                appliedFilters.map(item => {
                                    if (item.value.length > 0) {
                                        if (item.value.length > 1) {
                                            item.value.map((item2, index) => {
                                                console.log('index', index)
                                                filtros.push({ columna: item.column.field, value: item.value[index] })
                                            })
                                        } else {
                                            filtros.push({ columna: item.column.field, value: item.value[0] })
                                        }
                                    }
                                })

                                setFilteredData(filtros)
                            }

                        }}


                        options={{
                            selection: false,
                            groupOrder: true,
                            filtering: true,
                            sorting: true,
                            pageSize: data.length <= 5 ? 5 : data.length <= 10 ? 10 : 20,
                            exportButton: true, // Mostrar el botón de exportación
                            exportAllData: true, // Exportar todos los datos (o solo los filtrados)
                            exportMenu: [{
                                label: 'Exportar PDF',
                                exportFunc: (cols, datas) => {
                                    const doc = new jsPDF('landscape', 'pt', 'A3'); // Cambia a A3 si es necesario
                                    doc.setFontSize(10);

                                    // Mapeamos los títulos de las columnas para el encabezado
                                    const tableColumn = cols.map(col => col.title);

                                    // Mapeamos los datos de las filas
                                    const tableRows = [];

                                    datas.forEach((item) => {
                                        const row = cols.map(col => item[col.field] || ''); // Si no existe, dejar vacío
                                        tableRows.push(row);
                                    });

                                    // AutoTable configuración
                                    doc.autoTable({
                                        head: [tableColumn],   // Encabezados de la tabla
                                        body: tableRows,       // Cuerpo de la tabla con datos
                                        startY: 50,            // Posición Y inicial
                                        styles: {
                                            fontSize: 8,         // Reducir el tamaño de la fuente para ajustar más contenido
                                            cellPadding: 3,      // Ajuste dentro de las celdas
                                            overflow: 'linebreak', // Ajuste de texto automático
                                        },
                                        margin: { top: 50 },   // Margen superior
                                        theme: 'grid',         // Estilo de la tabla
                                    });

                                    doc.save(title + '.pdf'); // Nombre del archivo PDF
                                }
                            }, {
                                label: 'Exportar CSV',
                                exportFunc: (cols, datas) => {
                                    const dataExport = []
                                    data.map((item) => {
                                        let items = new Object();
                                        cols.map(col => {
                                            items[col.field] = item[col.field]
                                        })
                                        dataExport.push(items)
                                    })
                                    ExportCsv(cols, dataExport, title)
                                }
                            }, {
                                label: 'Exportar Excel',
                                exportFunc: (cols, datas) => {
                                    handleDownloadExcel()
                                }
                            }],

                            rowStyle: rowData => {
                                if (rowData.existePerfil == true) {
                                    return { backgroundColor: "#49be25" }
                                }
                                if (rowData.existePerfil == false) {
                                    return { backgroundColor: "#be4d25" }
                                }
                            },
                            idSynonym: 'unique_parent_id',
                            cellStyle: { border: '1px solid #eee' },
                            actionsColumnIndex,
                            paginationType: "stepped",
                            headerStyle: {
                                backgroundColor: "#f3f6f9",
                                textAlign: "center",
                                border: '1px solid #eee'
                            },

                            thirdSortClick: false,
                        }}
                    />
                </>

            }
        </>
    )
}

export default Tabla