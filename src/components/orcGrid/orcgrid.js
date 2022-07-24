import React from 'react';
import moment from 'moment';

// MUI
import { DataGrid } from '@mui/x-data-grid';


export const OrcGrid = ({rowss}) => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'user_id', headerName: 'Vendedor', width: 130 },
        { field: 'created_at', headerName: 'Data de Cadastro', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'valor_total', headerName: 'Valor Total', width: 130 }
    ];

    return(
        <div style={{ height: 400, width: '100%' }}>
            <p>TESTE</p>
            <DataGrid
                style={{backgroundColor: 'rgba(188,162,255,0.32)', backdropFilter: 'blur(.5rem)', borderRadius: '0.7rem', marginTop: '0.5rem'}}
                rows={rowss}
                columns={columns}
                pageSize={8}
                rowCount={rowss.length}
            />
        </div>
    );
}