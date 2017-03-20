const DefaultColors = {
    primary: "#8d00cd",
    white: "#ffffff",
    whiteDisabled: "rgba(255, 255, 255, 0.5)",
    lightGray1: "rgb(236, 236, 236)",
    darkGray: 'rgb(100, 100, 100)'
}

export module AppStyles {
    export var Colors = {
        primary: DefaultColors.primary,
        white: DefaultColors.white,
        whiteDisabled: DefaultColors.whiteDisabled,
        lightGray1: DefaultColors.lightGray1,
        darkGray: DefaultColors.darkGray
    };

    export var Fonts = {
        primary: 'Poppins'
    }

    export var NodallBar = {
        height: 80
    }

    export var ControlsBar = {
        height: 50,
        background: DefaultColors.primary,
        foreground: DefaultColors.white,
        disabled: DefaultColors.whiteDisabled
    };

    export var Footer = {
        inlineStyle: {
            position: 'relative',
            width: '100%',
            height: 65,
            backgroundColor: DefaultColors.primary,
            textAlign: 'center',
            color: DefaultColors.white,
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 20,
        } as React.CSSProperties,
        height: 65,
        containerStyle: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
            width: 120,
            height: '100%',
            textAlign: 'center',
        } as React.CSSProperties,
        spanStyle: {
            alignSelf: 'center',
            color: 'white',
            fontWeight: 'bold'
        } as React.CSSProperties
    }

    export var VideoItem = {
        mainContainer: {
            padding: '10px 10px 0px 10px',
            boxSizing: 'border-box',
            overflow: 'hidden'

        } as React.CSSProperties,
        contentContainer: {
            width: '100%',
            border: '1px solid #eee',
            overflow: 'hidden',
            boxSizing: 'border-box'
        } as React.CSSProperties,
        videoImg: {
            width: '100%',
            height: 250,
            float: 'left',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            //marginRight: 14
        } as React.CSSProperties,
        videoInfoContainer: {
            width: '100%',
            float: 'left',
            backgroundColor: DefaultColors.lightGray1,
            padding: 10,
            overflow: 'hidden',
            boxSizing: 'border-box'
        } as React.CSSProperties,
        videoTitleContainer: {
            width: '100%',
            overflow: 'hidden'
        } as React.CSSProperties,
        videoTitle: {
            fontSize: 20,
            color: DefaultColors.primary,
            fontWeight: 'bold',
            float: 'left'
        } as React.CSSProperties,
        videoTime: {
            float: 'right',
            color: DefaultColors.darkGray
        } as React.CSSProperties,
        description: {
            fontSize: 14,
            color: DefaultColors.darkGray
        } as React.CSSProperties
    }
    
    export var SearchBox = {
        inlineStyle: {
            position: 'relative',
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
        },
        container: {
            position: 'relative',
            width: '100%',
            height: 50,
            margin: 0,
            padding: 0,
            borderTop: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
        },
        searchField: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'relative',
            float: 'left',
            width: 'calc(100% - 122px)',
            height: '100%',
            margin: 0,
            padding: '0px 10px 0px 10px',
            backgroundColor: DefaultColors.primary
        } as React.CSSProperties,
        input: {
            margin: 0,
            width: '100%',
            fontSize: 18,
            padding: 0,
            fontFamily: Fonts.primary,
            webkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            border: 0,
            backgroundColor: DefaultColors.primary,
            color: DefaultColors.white
        } as React.CSSProperties,
        btnContainer: {
            float: 'left',
            position: 'relative',
            width: 50,
            height: '100%',
            borderLeft: '1px solid ' + DefaultColors.whiteDisabled,
            backgroundColor: DefaultColors.primary,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        } as React.CSSProperties,
        btnWidth: 50
    }
    export var Map = {
        container:{
            position: 'relative',
            width: '100%',
            height: '30%',
            margin: 0,
            padding: 0,
        }
    }
    export var POIList = {
        container: {
            position: 'relative',
            width: '100%',
            height: 'calc(70% - 50px)',
            margin: 0,
            padding: 0,
            overflowY: 'auto'
        }
    }
}