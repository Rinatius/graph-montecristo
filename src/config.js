import React from 'react'
import BusinessIcon from '@material-ui/icons/Business';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GavelIcon from '@material-ui/icons/Gavel';



const cardConfig = {
    KgMinjust: {
        label: 'KgMinjust',
        style: {backgroundColor: 'red'},
        icon: <BusinessIcon  style={{ fontSize: 30 }}/>,
        svg: 'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FbusinessIcon.svg?alt=media&token=454843aa-3fff-4dc6-acfa-81e509cacb3d',
        subHeaderUrlParam: 'url',
        subHeaderText: 'Минюст',
        contentTextParam: 'name_ru',
        properties: ['name_ru', 'inn', 'head_name_sur', 'street'],
        links: ['CONTROLS', 'DIRECTOR', 'SAME_INN']
    },
    KgMinjustParticipants: {
        label: 'KgMinjustParticipants',
        style: {backgroundColor: 'red'},
        icon: <AccountCircleIcon style={{ fontSize: 30 }}/>,
        svg: 'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FaccounCircle.svg?alt=media&token=9d19e90c-29fd-46a8-acd1-68e5637a4927',
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
        svg:  'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FaccounCircle.svg?alt=media&token=9d19e90c-29fd-46a8-acd1-68e5637a4927',
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
        svg: 'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FbusinessIcon.svg?alt=media&token=454843aa-3fff-4dc6-acfa-81e509cacb3d',
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
        svg:  'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FgavelIcon.svg?alt=media&token=eca18ed3-cda5-40fe-b1dc-5ce0a6d53e14',
        subHeaderUrlParam: 'tender_url',
        subHeaderText: 'Гос. закупки',
        contentTextParam: 'lot_name',
        properties: ['lot_name'],
        links: ['PARTICIPATED_IN', 'INCLUDES_LOTS']
    }
}

export default cardConfig