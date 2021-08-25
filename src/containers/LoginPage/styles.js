
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
        marginBottom: -200,
    },
    card:{
        width: 'auto',
        maxWidth: 450,
        height:'auto',
        maxHeight: 400,
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