import I18n from 'react-native-i18n';
import en from './locale/en';
import ko from './locale/ko';

I18n.fallbacks = true;

I18n.translations = {
    en,
    ko
};

export default I18n;