import React from 'react'
import BusinessIcon from '@material-ui/icons/Business';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GavelIcon from '@material-ui/icons/Gavel';



const cardConfig = {
    KgMinjust: {
        label: 'KgMinjust',
        style: {backgroundColor: '#fbc02d'},
        icon: <BusinessIcon  style={{ fontSize: 30 }}/>,
        svg: 'https://raw.githubusercontent.com/aleks-walker/graph-montecristo-config/8f8c6843a73515bd2deb47f4b80b8cdf9c0d2451/businessYellow.svg',
        subHeaderUrlParam: 'url',
        subHeaderText: 'Минюст',
        contentTextParam: 'name_ru',
        properties: ['name_ru', 'inn', 'head_name_sur', 'street'],
        links: ['CONTROLS', 'DIRECTOR', 'SAME_INN']
    },
    KgMinjustParticipants: {
        label: 'KgMinjustParticipants',
        style: {backgroundColor: '#fbc02d'},
        icon: <AccountCircleIcon style={{ fontSize: 30 }}/>,
        svg: 'https://raw.githubusercontent.com/aleks-walker/graph-montecristo-config/8f8c6843a73515bd2deb47f4b80b8cdf9c0d2451/accountYellow.svg',
        subHeaderUrlParam: 'org_url',
        subHeaderText: 'Минюст',
        contentTextParam: 'name',
        properties: ['name'],
        links: ['CONTROLS', 'NAME_SAKE', 'PROBABLE_FATHER', 'PROBABLE_SIBLING', 'PROBABLE_KID']
    },
    HeadNameSur: {
        label: 'HeadNameSur',
        style: {backgroundColor: '#fbc02d'},
        icon: <AccountCircleIcon  style={{ fontSize: 30 }}/>,
        svg:  'https://raw.githubusercontent.com/aleks-walker/graph-montecristo-config/8f8c6843a73515bd2deb47f4b80b8cdf9c0d2451/accountYellow.svg',
        subHeaderUrlParam: '',
        subHeaderText: 'Минюст',
        contentTextParam: 'head_name_sur',
        properties: ['head_name_sur'],
        links: ['DIRECTOR', 'NAME_SAKE', 'PROBABLE_FATHER', 'PROBABLE_SIBLING', 'PROBABLE_KID']
    },
    KgProcurementParticipants: {
        label: 'KgProcurementParticipants',
        style: {backgroundColor: '#00897b'},
        icon: <BusinessIcon style={{ fontSize: 30 }}/>,
        svg: 'https://raw.githubusercontent.com/aleks-walker/graph-montecristo-config/8f8c6843a73515bd2deb47f4b80b8cdf9c0d2451/busiessGreen.svg',
        subHeaderUrlParam: '',
        subHeaderText: 'Гос. закупки',
        contentTextParam: 'name',
        properties: ['inn'],
        links: ['PARTICIPATED_IN', 'PARTICIPATED_IN', 'NAME_SAKE_INDIVIDUAL']
    }, 
    KgProcurementLots: {
        label: 'KgProcurementLots',
        style: {backgroundColor: '#00897b'},
        icon: <GavelIcon style={{ fontSize: 30 }}/>,
        svg:  'https://raw.githubusercontent.com/aleks-walker/graph-montecristo-config/8f8c6843a73515bd2deb47f4b80b8cdf9c0d2451/gavelGreen.svg',
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


export const relationshipConfig = {
    
    CONTROLS: {
        properties: []
    },
    ANNOUNCED: {
        properties: []
    },
    DIRECTOR: {
        properties: []
    },
    INCLUDES_LOTS: {
        properties: []
    },
    NAME_SAKE: {
        properties: []
    },
    NAME_SAKE_INDIVIDUAL: {
        properties: []
    },
    PROBABLE_FATHER: {
        properties: []
    },
    PARTICIPATED_IN: {
        properties: ['proposed_price', 'result'],
        'result': [{
            value: '(Подтверждено)',
            regex: true,
            color: "red"
        }]
    },
    PROBABLE_SIBLING: {
        properties: []
    },
    PROBABLE_KID: {
        properties: []
    },
    SAME_INN: {
        properties: []
    },
}
