import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme =>({

    drawer: {
        flexShrink: '0',
        zIndex: '0',
        background: 'rgba(255, 255, 255, 0.226)',
        minHeight: '100%',
        maxWidth: '15%',
        position: 'fixed',

    },

}))

export default useStyles