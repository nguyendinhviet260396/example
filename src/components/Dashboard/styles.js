
const styles=(theme)=>({
    dashboard:{
        display: 'flex',
        flexDirection: 'column',
    },
    wrapper:{
        display: 'flex',
        flexDirection:'row',
        height: '100%',
        minHeight: '100%'
    },
    wrapperContent:{
        width: '100%',
        padding: 10,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
    },
    shiftLeft:{
        marginLeft: -240,
        transition:theme.transitions.create('margin',{
            easing:theme.transitions.easing.easeOut,
            duration:theme.transitions.duration.LeavingSreen,
        })
        
    },
    rapperFooter:{
        backgroundColor:'#4169E1',
        color: 'white',
        width:'100%',
        height:'60px', /* Height of the footer */
        position: 'autofill',
        marginBottom: -35,
        }
});
export default styles;