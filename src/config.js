import React from 'react'
import BusinessIcon from '@material-ui/icons/Business';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GavelIcon from '@material-ui/icons/Gavel';

const cardConfig = {
    KgMinjust: {
        label: 'KgMinjust',
        style: {backgroundColor: 'red'},
        icon: <BusinessIcon  style={{ fontSize: 30 }}/>,
        subHeaderUrlParam: 'url',
        subHeaderText: 'Минюст',
        contentTextParam: 'name_ru',
        properties: ['name_ru', 'inn'],
        links: ['CONTROLS', 'DIRECTOR', 'SAME_INN']
    },
    KgMinjustParticipants: {
        label: 'KgMinjustParticipants',
        style: {backgroundColor: 'red'},
        icon: <AccountCircleIcon style={{ fontSize: 30 }}/>,
        subHeaderUrlParam: 'org_url',
        subHeaderText: 'Минюст',
        contentTextParam: 'name',
        properties: ['name'],
        links: ['CONTROLS', 'NAME_SAKE', 'PROBABLE_FATHER', 'PROBABLE_SIBLING', 'PROBABLE_KID']
    },
    HeadNameSur: {
        label: 'HeadNameSur',
        style: {backgroundColor: 'red'},
        icon: <AccountCircleIcon  style={{ fontSize: 30 }}/>,
        subHeaderUrlParam: '',
        subHeaderText: 'Минюст',
        contentTextParam: 'inn',
        properties: ['inn'],
        links: ['DIRECTOR', 'NAME_SAKE', 'PROBABLE_FATHER', 'PROBABLE_SIBLING', 'PROBABLE_KID']
    },
    KgProcurementParticipants: {
        label: 'KgProcurementParticipants',
        style: {backgroundColor: 'blue'},
        icon: <BusinessIcon style={{ fontSize: 30 }}/>,
        subHeaderUrlParam: '',
        subHeaderText: 'Гос. закупки',
        contentTextParam: 'inn',
        properties: ['inn'],
        links: ['PARTICIPATED_IN', 'PARTICIPATED_IN', 'NAME_SAKE_INDIVIDUAL']
    }, 
    KgProcurementLots: {
        label: 'KgProcurementLots',
        style: {backgroundColor: 'blue'},
        icon: <GavelIcon style={{ fontSize: 30 }}/>,
        subHeaderUrlParam: 'tender_url',
        subHeaderText: 'Гос. закупки',
        contentTextParam: 'lot_name',
        properties: ['lot_name'],
        links: ['PARTICIPATED_IN', 'INCLUDES_LOTS']
    }
}

export default cardConfig