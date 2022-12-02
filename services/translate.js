import en from '../locales/en';
const t = key => {
    const split = key.split('.');

    return (
        split.reduce((acc, item) => {
            return acc[item];
        }, en) ?? key
    );
};

export default t;