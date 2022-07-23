import React from 'react';

// MUI
import { DataGrid } from '@mui/x-data-grid';

export default function ProductsGrid(rowss) {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'reference', headerName: 'Referência', width: 130 },
        { field: 'name', headerName: 'Produto', width: 130 },
        { field: 'quantidade', headerName: 'Quantidade', width: 130 },
        { field: 'value', headerName: 'Preço', width: 130 },
        { field: 'value_cust', headerName: 'Preço de Custo', width: 130 },
        { field: 'CEST', headerName: 'CEST', width: 130 },
        { field: 'NCM', headerName: 'NCM', width: 130 },
        { field: 'IPI', headerName: 'IPI', width: 130 },
        { field: 'created_at', headerName: 'Cadastrado', width: 130 },
        { field: 'cEAN', headerName: 'cEAN', width: 130 },
        { field: 'updated_at', headerName: 'Atualizado', width: 130 },
        { field: 'vendor_id', headerName: 'Fornecedor', width: 130 }
    ];

    let i = 0;
    let list = [];
    let base;

    for(i; i < rowss.length; i++){
        console.log(i);
    }

    console.log(list);

    console.log(typeof list);

    return(
        <div style={{ height: 400, width: '100%' }}>
            <p>TESTE</p>
            <DataGrid
                columns={columns}
                rows={list}
                rowHeight={50}
                rowCount={list.length}
                width={'100%'}
                height={'100%'}
                headerHeight={50}
                footerHeight={50}
                rowSelection={{
                    enabled: true,
                }}
            />
        </div>
    );
}