import {Edit, NumberInput, SimpleForm, TextInput} from "react-admin";
import { RichTextInput } from 'ra-input-rich-text';
export const EditGood = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput name="good-id" source="id" disabled />
                {/*<ReferenceInput source="userId" reference="users" />*/}
                <TextInput name="good-name" source="name"/>
                <NumberInput name="good-base-price" source="basePrice"/>
                <TextInput name="good-ingredients" source="ingredients"/>
                <RichTextInput name="good-description" source="description" multiline rows={3}/>
            </SimpleForm>
        </Edit>
    )
}