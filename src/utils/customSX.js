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
    //increase font size select input
    '& .MuiSelect-select': {
      fontSize: '14px',
    },
    // change the color of the selected row
    '& .MuiDataGrid-row.Mui-selected': {
      backgroundColor: colors.greenAccent[800],
    },
    // change hover row color
    '& .MuiDataGrid-row:hover': {
      backgroundColor: colors.greenAccent[700],
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
      fontSize: '16px', // Adjust cell font size
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: colors.blueAccent[700],
      borderBottom: 'none',
      fontSize: '18px', // Adjust header font size
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
