import React, { useEffect, useState } from 'react'
import {
    MenuItem,
    Select,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

function getStoredLang() {
    let lang = localStorage.getItem('LANGUAGE')
    if (lang && lang.length >= 2) {
        return lang
    }
    return 'en'
}

// TODO: Add some validation
export default function LanguageSwitcher() {
    const availableLangs = ['en', 'pt-PT']
    const {i18n} = useTranslation()
    const {t} = useTranslation(['main'])
    const [lang, setLang] = useState(getStoredLang)
    let children = []

    const changeLang = (e) => {
        let nLang = e.target.value
        if (lang !== nLang && lang.length >= 2) {
            i18n.changeLanguage(nLang)
            setLang(nLang)
            localStorage.setItem('LANGUAGE', nLang)
        }
    }

    useEffect(()=>{
        console.log("Language effect triggered")
        window.dataLayer?.push({
            event: 'event',
            eventProps: {
                category: 'acessibility',
                action: 'change',
                label: 'language',
                value: lang
            }
        })

    }, [lang])

    for (let lng in availableLangs) {
        children.push(<MenuItem  key={lng} value={availableLangs[lng]}>{availableLangs[lng]}</MenuItem>)
    }
    return (
        <Select sx={{
            height: '5ch'
            }}
            style={{color: "white"}}
            labelId="lang-selector"
            id="lang-selector"
            value={lang}
            label={t("footer.lang")}
            onChange={changeLang}
            >
            {children}
        </Select>
    )
}