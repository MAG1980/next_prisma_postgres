import {RichTextField, Show, TextField} from "react-admin";
import React, {ReactNode} from "react";

function SimpleShowLayout(props: { children: ReactNode }) {
    return null;
}

export const ShowGood = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id"/>
                <TextField source="name"/>
                <TextField source="category"/>
                <RichTextField source="description"/>
                {/*<DateField label="Publication date" source="published_at" />*/}
            </SimpleShowLayout>
        </Show>
    )
}