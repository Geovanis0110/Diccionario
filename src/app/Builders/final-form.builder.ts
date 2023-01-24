import { AnotherForms, FinalForm, FormField } from "../Interfaces/word.interface";

export class FinalFormBuilder {
    private readonly _finalForm: FinalForm = {
        form: { orth: '', gen: '', gram: '', lbl: '', number: '', posErrores: '', syll: '' },
        forms: [],
        anothers: []
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

    withAnothers(anothers: Array<AnotherForms>): FinalFormBuilder{
        this._finalForm.anothers = anothers;
        return this;
    }

    build(): FinalForm {
        return this._finalForm;
    }
}