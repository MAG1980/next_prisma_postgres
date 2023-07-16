import {Edit, NumberInput, SimpleForm, TextInput} from "react-admin";
import {RichTextInput} from 'ra-input-rich-text';
import {ItemTitle} from "@/admin/components/ItemTitle"

export const EditGood = () => {
    return (
        <Edit title={<ItemTitle recordType="Good" source="name"/>}>
            <SimpleForm>
                <TextInput name="good-id" source="id" disabled/>
                {/*<ReferenceInput source="userId" reference="users" />*/}
                <TextInput name="good-name" source="name"/>
                <NumberInput name="good-base-price" source="basePrice"/>
                <TextInput name="good-ingredients" source="ingredients"/>
                <RichTextInput name="good-description" source="description"/>
            </SimpleForm>
        </Edit>
    )
}