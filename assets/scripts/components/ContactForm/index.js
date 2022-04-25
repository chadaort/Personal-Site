import React, { useState, useEffect, useCallback } from 'react';
import emailValidator from 'email-validator';
import { debounce } from 'lodash';
import './styles.scss';

function ContactForm() {

	// Can either be invalid, valid, success, or error
	const [ formState, setFormState ] = useState( 'invalid' );
	const [ formValues, setFormValues ] = useState( {
		name: { valid: false },
		email: { valid: false },
		message: { valid: false },
		['accepted-terms']: { valid: false },
	} );

	const debounceFormValUpdate = event => useCallback( debounce( event => updateFormValues( event ), 700 ), [ 'formValues' ] );

	/**
	 * Either fires the on change handler immediately or passes it to a debounce function.
	 * The update is not postponed when the element has an active error
	 * @param {Event} event
	 */
	const onChangeHandler = ( event ) => {
		event.persist();

		const updateFormValues = event => setFormValues( formValues => ( {
			...formValues,
			[ event.target.name ]: {
				value: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
				...validateInput( event.target ),
			}
		} ) );

		// Throttle updates except when there is already an error message.
		! formValues[ event.target.name ].errorMsg ?
			debounceFormValUpdate( event ) :
			//useCallback( debounce( event => updateFormValues( event ), 700 ), [] ) :
			updateFormValues( event );
	};

	/**
	 * Form submission event handler.
	 * @param {Event} event Form submission event.
	 */
	 const onSubmitHandler = async ( event ) => {
		event.preventDefault();

		// @tdo Handle the form submission with error and success states.
		formState( 'success' );
	};

	/**
	 * Creates an error message element for an input.
	 *
	 * @param {string} msg Error message to be displayed
	 * @returns string
	 */
	 const InputErrorEl = msg => {
		return <span className="msg">{ msg }</span>;
	};

	/**
	 * Creates a form-level success message element.
	 *
	 * @param {string} msg Success message to be displayed
	 * @returns string
	 */
	const formSuccessEl = msg => {
		return <div className="success">{ msg }</div>;
	};

	/**
	 * Creates a form-level error message elenent.
	 *
	 * @param {string} msg Error message to be displayed
	 * @returns string
	 */
	const formErrorEl = msg => {
		return <div className="error">{ msg }</div>;
	};

	/**
	 * Validates a form element and also returns validation errors.
	 * @param {Element} el DOM element object.
	 * @returns {string[]}
	 */
	 const validateInput = ( el ) => {

		let valid = false;
		let errorMsg;

		switch ( el.name ) {
			case 'name':
				// Validate the field length.
				valid = el.value.length >= 3;
				if ( ! valid ) {
					errorMsg = 'You need at least 3 characters.';
				}
				break;

			case 'email':
				// Validate the field length.
				valid = el.value.length >= 3;
				if ( ! valid ) {
					errorMsg = 'You need at least 3 characters.';
					break;
				}

				valid = emailValidator.validate( el.value );
				if ( ! valid ) {
					errorMsg = 'You must use a valid email address.';
				}
				break;

			case 'message':
				// Validate the field length.
				valid = el.value.length >= 10;
				if ( ! valid ) {
					errorMsg = 'You need at least 10 characters.';
				}
				break;

			case 'accepted-terms':
				// Validate that the checkbox is checked.
				valid = el.checked;
				if ( ! valid ) {
					errorMsg = 'You must accept the terms';
				}
				break;
		}

		return {
			valid,
			errorMsg,
		}
	};

	/**
	 * Creates the form elements.
	 * @returns {string}
	 */
	const formEl = () => {
		return (
			<form
				className="contact-form"
				onSubmit={ onSubmitHandler }>

				<label className="contact-form__name-label">
					{ ! formValues.name.valid && InputErrorEl( formValues.name.errorMsg ) }
					<input
						className="contact-form__name"
						id="contact-form__name"
						name="name"
						placeholder="Name"
						type="text"
						onChange={ onChangeHandler }
						required />
				</label>

				<label className="contact-form__email-label">
					{ ! formValues.email.valid && InputErrorEl( formValues.email.errorMsg ) }
					<input
						className="contact-form__email"
						id="contact-form__email"
						name="email"
						placeholder="Email"
						type="email"
						onChange={ onChangeHandler }
						required />
				</label>

				<label className="contact-form__message-label">
					{ ! formValues.message.valid && InputErrorEl( formValues.message.errorMsg ) }
					<textarea
						className="contact-form__message"
						id="contact-form__message"
						name="message"
						placeholder="Message..."
						onChange={ onChangeHandler }
						required>
					</textarea>
				</label>

				<label className="contact-form__accepted-terms-label">
					{ ! formValues['accepted-terms'].valid && InputErrorEl( formValues['accepted-terms'].errorMsg ) }
					<a href="#" className="contact-form__accepted-terms-anchor">I accept the terms of service</a>
					<input
						className="contact-form__accepted-terms"
						id="contact-form__accepted-terms"
						name="accepted-terms"
						type="checkbox"
						onChange={ onChangeHandler }
						required />
				</label>

				<button
					className="contact-form__submit"
					type="submit"
					disabled={ ! ( formState === 'valid' ) }
				>Send Your Message</button>
			</form>
		);
	};

	/**
	 * Returns the view that matches the form state.
	 * @returns {string}
	 */
	const getFormView = () => {
		switch ( formState ) {
			case 'success':
				return formSuccessEl( 'something' );
			case 'error':
				return formErrorEl( 'something' );
			default:
				return formEl();
		}
	};

	/**
	 * Runs after formValues states has changed.
	 */
	 useEffect( () => {
		setFormState( Object.keys( formValues ).every( item => formValues[ item ].valid ) ? 'valid' : 'invalid' );
	}, [ formValues ] );

	return( getFormView() );
}

export default ContactForm;
