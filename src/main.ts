// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

import '@/styles/settings.scss';

// Components
import CardContainer from '@/components/layouts/CardContainer.vue';
import FormDialog from '@/components/dialogs/FormDialog.vue';

import Btn from '@/components/inputs/Btn.vue';
import TextField from '@/components/inputs/TextField.vue';
import SelectField from '@/components/inputs/SelectField.vue';
import ExpansionPanel from '@/components/inputs/ExpansionPanel.vue';
import Checkbox from '@/components/inputs/Checkbox.vue';
import DatePicker from '@/components/inputs/DatePicker.vue';
import DateRangePicker from '@/components/inputs/DateRangePicker.vue';
import SwitchBtn from '@/components/inputs/SwitchBtn.vue';
import Loader from '@/components/common/Loader.vue';
import BaseDialog from '@/components/common/BaseDialog.vue';
import TextArea from '@/components/inputs/TextArea.vue';
import Tooltip from '@/components/inputs/Tooltip.vue';
import AutoComplete from '@/components/inputs/AutoComplete.vue';
import ComboBox from '@/components/inputs/ComboBox.vue';

import Editor from '@/components/inputs/Editor.vue';

import Search from '@/components/common/Search.vue';
import SvgLoader from '@/components/common/SvgLoader.vue';

const app = createApp(App);
app.component('CardContainer', CardContainer);
app.component('FormDialog', FormDialog);

app.component('Btn', Btn);
app.component('TextField', TextField);
app.component('SelectField', SelectField);
app.component('ExpansionPanel', ExpansionPanel);
app.component('Checkbox', Checkbox);
app.component('DatePicker', DatePicker);
app.component('DateRangePicker', DateRangePicker);
app.component('SwitchBtn', SwitchBtn);
app.component('Loader', Loader);
app.component('BaseDialog', BaseDialog);
app.component('TextArea', TextArea);
app.component('Tooltip', Tooltip);
app.component('AutoComplete', AutoComplete);
app.component('ComboBox', ComboBox);

app.component('Editor', Editor);

app.component('Search', Search);
app.component('SvgLoader', SvgLoader);

registerPlugins(app);

app.mount('#app');
