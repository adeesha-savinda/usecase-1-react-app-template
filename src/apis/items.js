import axios from 'axios';
import {default as configs} from './configs.json';

const url = `${configs.apiBaseUrl}${configs.itemsRoute}`;

export default axios.create({
    baseURL: "https://938b79aa-9e72-4948-90f5-9a88e9cdfaf0-dev.e1-us-east-azure.choreoapis.dev/iwfo/myfirstapi/1.0.0",
});