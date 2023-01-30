import { AnotherForms, FinalForm, FormField } from "../Interfaces/word.interface";
import {FormFieldBuilder} from "./form-field.builder";

export class FinalFormBuilder {
    private readonly _finalForm: FinalForm = {
        form: FormFieldBuilder.newInstance().build(),
        forms: [],
        another: []
    }

    static newInstance(): FinalFormBuilder {
        return new FinalFormBuilder();
    }

    withForm(form: FormField): FinalFormBuilder {
        this._finalForm.form = form;
        return this;
    }

    withForms(forms: Array<FormField>): FinalFormBuilder{
        this._finalForm.forms = forms;
        return this;
    }

    withAnother(another: Array<AnotherForms>): FinalFormBuilder{
        this._finalForm.another = another;
        return this;
    }

    build(): FinalForm {
        return this._finalForm;
    }
}
