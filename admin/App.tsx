import {ReactElement} from "react";
// import jsonServerProvider from 'ra-data-json-server';
import {Admin, EditGuesser, ListGuesser, Resource, ShowGuesser} from "react-admin";
import {dataProvider} from "@/admin/dataProvider"
import {ListGood} from "@/admin/components/Good/ListGood";
import {CreateGood} from "@/admin/components/Good/CreateGood";
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = (): ReactElement => (
    <div>
        <h1>Admin Panel</h1>
        <Admin dataProvider={dataProvider}>
            <Resource name="goods" list={ListGuesser} create={CreateGood} edit={EditGuesser} show={ShowGuesser} recordRepresentation="name" />
        </Admin>
    </div>
);
export default App