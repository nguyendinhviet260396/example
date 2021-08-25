
const styles=(theme)=>({
    background:{
        backgroundColor: theme.color.primary,
        //padding: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        flex:'1 0 auto',
    },
    card:{
        width: 'auto',
        height: 'auto',
        maxWidth: 500,
    },
    label:{
    },
    typography:{
        fontSize: 25,
    },
    textField:{
    },
    button:{
        margin: 10,
        width: 120,
        height: 35,
    }
});
export default styles;