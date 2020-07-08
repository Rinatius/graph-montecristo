import React from 'react'
import BusinessIcon from '@material-ui/icons/Business';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GavelIcon from '@material-ui/icons/Gavel';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


const cardConfig = {
    KgMinjust: {
        label: 'KgMinjust',
        style: {backgroundColor: '#fbc02d'},
        icon: <BusinessIcon  style={{ fontSize: 30 }}/>,
        svg: 'https://raw.githubusercontent.com/aleks-walker/graph-montecristo-config/8f8c6843a73515bd2deb47f4b80b8cdf9c0d2451/businessYellow.svg',
        subHeaderUrlParam: 'url',
        subHeaderText: 'Минюст',
        contentTextParam: 'name_ru',
        properties: ['inn', 'head_name_sur', 'region', 'district', 'street', 'home', 'apartment'],
        links: ['CONTROLS', 'DIRECTOR', 'SAME_INN'],
        reverseLinks: {}
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
        links: ['CONTROLS', 'NAME_SAKE', 'PROBABLE_FATHER', 'PROBABLE_SIBLING', 'PROBABLE_KID'],
        reverseLinks: {}
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
        links: ['DIRECTOR', 'NAME_SAKE', 'PROBABLE_FATHER', 'PROBABLE_SIBLING', 'PROBABLE_KID'],
        reverseLinks: {}
    },
    KgProcurementParticipants: {
        label: 'KgProcurementParticipants',
        style: {backgroundColor: '#00897b'},
        icon: <BusinessIcon style={{ fontSize: 30 }}/>,
        svg: 'https://raw.githubusercontent.com/aleks-walker/graph-montecristo-config/8f8c6843a73515bd2deb47f4b80b8cdf9c0d2451/busiessGreen.svg',
        subHeaderUrlParam: '',
        subHeaderText: 'Госзакупки',
        contentTextParam: 'name',
        properties: ['inn'],
        links: ['PARTICIPATED_IN', 'NAME_SAKE_INDIVIDUAL'],
        reverseLinks: {}
    }, 
    KgProcurementLots: {
        label: 'KgProcurementLots',
        style: {backgroundColor: '#00897b'},
        icon: <GavelIcon style={{ fontSize: 30 }}/>,
        svg:  'https://raw.githubusercontent.com/aleks-walker/graph-montecristo-config/8f8c6843a73515bd2deb47f4b80b8cdf9c0d2451/gavelGreen.svg',
        subHeaderUrlParam: 'tender_url',
        subHeaderText: 'Госзакупки',
        contentTextParam: 'lot_name',
        properties: ['lot_name', 'lot_sum_int'],
        links: ['PARTICIPATED_IN', 'INCLUDES_LOTS'],
        reverseLinks: {'PARTICIPATED_IN':'PARTICIPANTS',
                        'INCLUDES_LOTS': 'TENDER'}
    },
    KgProcurement: {
        label: 'KgProcurement',
        style: {backgroundColor: '#00897b'},
        icon: <MonetizationOnIcon style={{ fontSize: 30 }}/>,
        svg:  'https://raw.githubusercontent.com/aleks-walker/graph-montecristo-config/13c35330a9b7ae752e04638edb39068555ae9374/monetizeGreen.svg',
        subHeaderUrlParam: 'url',
        subHeaderText: 'Тендер',
        contentTextParam: 'procurement_object_no_quotes',
        properties: ['procurement_method', 'publication_date'],
        links: ['ANNOUNCED', 'INCLUDES_LOTS'],
        reverseLinks: {'ANNOUNCED':'ENTITY'}
    },
    KgProcurementEntitiesWithAddresses: {
        label: 'KgProcurementEntitiesWithAddresses',
        style: {backgroundColor: '#00897b'},
        icon: <AccountBalanceIcon style={{ fontSize: 30 }}/>,
        svg:  'https://raw.githubusercontent.com/aleks-walker/graph-montecristo-config/83020b7357a5888d237b3661800fec934f692be8/orgTenderGreen.svg',
        subHeaderUrlParam: '',
        subHeaderText: 'Закупающая организация',
        contentTextParam: 'procuring_entity', 
        properties: ['district'],
        links: ['ANNOUNCED'],
        reverseLinks: {}
    }
}

export default cardConfig


export const relationshipConfig = {
    
    CONTROLS: {
        properties: [],
        linkConf: {'fontSize' : 14}
    },
    ANNOUNCED: {
        properties: [],
        linkConf: {'fontSize' : 14}
    },
    DIRECTOR: {
        properties: [],
        linkConf: {'fontSize' : 14}
    },
    INCLUDES_LOTS: {
        properties: [],
        linkConf: {'fontSize' : 14}
    },
    NAME_SAKE: {
        properties: [],
        linkConf: {'fontSize' : 14}
    },
    NAME_SAKE_INDIVIDUAL: {
        properties: [],
        linkConf: {'fontSize' : 14}
    },
    PROBABLE_FATHER: {
        properties: [],
        linkConf: {'fontSize' : 14}
    },
    PARTICIPATED_IN: {
        properties: ['proposed_price', 'result'],
        'result': [{
            value: '(Подтверждено)',
            regex: true,
            color: "red"
        }],
        linkConf: {'fontSize' : 14}
    },
    PROBABLE_SIBLING: {
        properties: [],
        linkConf: {'fontSize' : 14}
    },
    PROBABLE_KID: {
        properties: [],
        linkConf: {'fontSize' : 14}
    },
    SAME_INN: {
        properties: [],
        linkConf: {'fontSize' : 14}
    },
}
