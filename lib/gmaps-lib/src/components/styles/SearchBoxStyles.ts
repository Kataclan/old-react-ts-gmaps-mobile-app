const colorPrimary = "#8d00cd";
const colorWhite = "#ffffff";
const colorWhiteDisabled = "rgba(255, 255, 255, 0.5)";

export var SearchBoxStyles  = {
    Colors : {
        primary: colorPrimary,
        white: colorWhite,
        whiteDisabled: colorWhiteDisabled,
    },

    Searchbox : {
        container: {
            position: 'relative',
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
        },
        containerStyle: {
            position: 'relative',
            width: '100%',
            height: 50,
            margin: 0,
            padding: 0,
            borderTop: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
        },
        searchboxContainerStyle: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'relative',
            float: 'left',
            width: 'calc(100% - 122px)',
            height: '100%',
            margin: 0,
            padding: '0px 10px 0px 10px',
            backgroundColor: colorPrimary
        } as React.CSSProperties,
        inputStyle: {
            margin: 0,
            width: '100%',
            fontSize: 18,
            padding: 0,
            fontFamily: 'Poppins',
            webkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            border: 0,
            backgroundColor: colorPrimary,
            color: colorWhite
        } as React.CSSProperties,
        btnContainerStyle: {
            float: 'left',
            position: 'relative',
            width: 50,
            height: '100%',
            borderLeft: '1px solid ' + colorWhiteDisabled,
            backgroundColor: colorPrimary,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        } as React.CSSProperties,
        iconBtnStyle:{
        
        }as React.CSSProperties,
        btnWidth: 50
    }
}