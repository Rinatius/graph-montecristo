import React from 'react'
import BusinessIcon from '@material-ui/icons/Business';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GavelIcon from '@material-ui/icons/Gavel';



const cardConfig = {
    KgMinjust: {
        label: 'KgMinjust',
        style: {backgroundColor: 'red'},
        icon: <BusinessIcon  style={{ fontSize: 30 }}/>,
        svg: 'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FbusinessIcon%20(3).svg?alt=media&token=3bfb714a-6b0e-4be4-b4ee-92573608a1b9',
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
        svg: 'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FaccounCircle%20(2).svg?alt=media&token=74846eeb-337b-4923-b87d-c2d3731f62cc',
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
        svg:  'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FaccounCircle%20(2).svg?alt=media&token=74846eeb-337b-4923-b87d-c2d3731f62cc',
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
        svg: 'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FbusinessIcon%20(3).svg?alt=media&token=3bfb714a-6b0e-4be4-b4ee-92573608a1b9',
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
        svg:  'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FgavelIcon%20(3).svg?alt=media&token=935334ef-fe3f-44bb-ab97-5fbc44d4594d',
        subHeaderUrlParam: 'tender_url',
        subHeaderText: 'Гос. закупки',
        contentTextParam: 'lot_name',
        properties: ['lot_name'],
        links: ['PARTICIPATED_IN', 'INCLUDES_LOTS']
    },
    KgProcurement: {
        label: 'KgProcurement',
        style: {backgroundColor: 'blue'},
        icon: <GavelIcon style={{ fontSize: 30 }}/>,
        svg:  'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FgavelIcon%20(3).svg?alt=media&token=935334ef-fe3f-44bb-ab97-5fbc44d4594d',
        subHeaderUrlParam: 'url',
        subHeaderText: 'Тендер',
        contentTextParam: 'procurement_object_no_quotes',
        properties: ['procurement_method'],
        links: ['ANNOUNCED', 'INCLUDES_LOTS']
    },
    KgProcurementEntitiesWithAddresses: {
        label: 'KgProcurementEntitiesWithAddresses',
        style: {backgroundColor: 'blue'},
        icon: <GavelIcon style={{ fontSize: 30 }}/>,
        svg:  'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/graph-montecristo%2FgavelIcon%20(3).svg?alt=media&token=935334ef-fe3f-44bb-ab97-5fbc44d4594d',
        subHeaderUrlParam: '',
        subHeaderText: 'Закупающая организация',
        contentTextParam: 'procuring_entity',
        properties: ['district'],
        links: ['ANNOUNCED']
    }
}

export default cardConfig