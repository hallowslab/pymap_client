import React from 'react'
import {
    AppBar,
    InputLabel,
    Box,
    Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from './languageSwitcher'



const Footer = () => {
    const {t} = useTranslation(['main'])

    return (
        <React.Fragment>
            <AppBar color="primary" sx={{ height: '9ch',top: 'auto', bottom: 0 }}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
            <InputLabel style={{display: 'inline-flex', color:"white"}} id="lang-selector-label">{t('footer.lang')}</InputLabel>
            <LanguageSwitcher/>
            <Typography variant="h7" style={{display: 'inline-flex', color:"white"}} component="div">
                Pymap © 2022
            </Typography>
            </Box>
            </AppBar>
        </React.Fragment>
    )
}
export default Footer
