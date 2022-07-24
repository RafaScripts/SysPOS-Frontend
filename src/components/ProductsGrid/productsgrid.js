import React from 'react';
import './style.css';

// MUI
import { DataGrid } from '@mui/x-data-grid';

export const ProductsGrid = ({ rows }) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'reference', headerName: 'Referência', width: 200 },
        { field: 'produto', headerName: 'Produto', width: 240 },
        { field: 'quantidade', headerName: 'Quantidade', width: 80 },
        { field: 'value', headerName: 'Preço', width: 80 },
        { field: 'value_cust', headerName: 'Preço de Custo', width: 80 },
        { field: 'CEST', headerName: 'CEST', width: 80 },
        { field: 'NCM', headerName: 'NCM', width: 200 },
        { field: 'IPI', headerName: 'IPI', width: 80 },
        { field: 'created_at', headerName: 'Cadastrado', width: 130 },
        { field: 'cEAN', headerName: 'cEAN', width: 80 },
        { field: 'updated_at', headerName: 'Atualizado', width: 130 },
        { field: 'vendor_id', headerName: 'Fornecedor', width: 30 }
    ];

    async function handleClick(row) {
        const reference = row.reference;
        const rr = row.target.outerText;

        console.log(reference, rr);
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                style={{backgroundColor: 'rgba(188,162,255,0.32)', backdropFilter: 'blur(.5rem)', borderRadius: '0.7rem', marginTop: '0.5rem'}}
                rows={rows}
                columns={columns}
                rowHeight={30}
                headerHeight={30}
                pageSize={10}
                onRowClick={(e, row) => {

                    handleClick(row);

                }}
                rowCount={rows.length}
                rowClassName={(rowIndex) => {
                    return rowIndex % 2 === 0 ? 'even' : 'odd';
                } }
            />
        </div>
    );
}

export const ProductsPosGrid = ({ rows }) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'reference', headerName: 'Referência', width: 200 },
        { field: 'name', headerName: 'Produto', width: 300 },
        { field: 'quantidade', headerName: 'Quantidade', width: 120 },
        { field: 'value', headerName: 'Preço', width: 80 },
    ];

    async function handleClick(row) {
        const reference = row.reference;
        const rr = row.target.outerText;

        console.log(reference, rr);
    }

    return (
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid
            style={{backgroundColor: 'rgba(188,162,255,0.32)', backdropFilter: 'blur(.5rem)', borderRadius: '0.7rem', marginTop: '0.5rem'}}
            rows={rows}
            columns={columns}
            rowHeight={30}
            headerHeight={30}
            pageSize={10}
            onRowClick={(e, row) => {
        
              handleClick(row);
        
            }}
            rowCount={rows.length}
            rowClassName={(rowIndex) => {
              return rowIndex % 2 === 0 ? 'even' : 'odd';
            } }
          />
        </div>
    );
}