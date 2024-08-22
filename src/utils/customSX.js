export const gridSxSettings = function (colors) {
  return {
    '& .MuiDataGrid-footerContainer': {
      borderTop: 'none',
      backgroundColor: colors.blueAccent[700],
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiTablePagination-toolbar': {
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0',
    },

    '& .MuiSelect-select': {
      fontSize: '14px',
    },

    '& .MuiDataGrid-row.Mui-selected': {
      backgroundColor: colors.greenAccent[800],
    },

    '& .MuiDataGrid-row:hover': {
      backgroundColor: colors.greenAccent[700],
    },
    '& .MuiDataGrid-cell': {
      fontSize: '18px',
    },
  };
};

export const boxSxSettings = function (colors) {
  return {
    '& .MuiDataGrid-root': {
      border: 'none',
    },
    '& .MuiDataGrid-cell': {
      borderBottom: 'none',
      fontSize: '16px',
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: colors.blueAccent[700],
      borderBottom: 'none',
      fontSize: '18px',
    },
    '& .MuiDataGrid-virtualScroller': {
      backgroundColor: colors.primary[400],
    },
    '& .MuiDataGrid-footerContainer': {
      borderTop: 'none',
      backgroundColor: colors.blueAccent[700],
      fontSize: '16px',
    },
    '& .MuiCheckbox-root': {
      color: `${colors.greenAccent[200]} !important`,
    },
  };
};

export const formSxSettings = function (colors) {
  return {
    '&.Mui-selected': {
      backgroundColor: colors.greenAccent[700],
    },
  };
};
