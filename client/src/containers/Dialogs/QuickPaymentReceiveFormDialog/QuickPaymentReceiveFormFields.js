import React from 'react';
import { FastField, ErrorMessage } from 'formik';
import { FormattedMessage as T } from 'react-intl';
import { useAutofocus } from 'hooks';
import {
  Classes,
  FormGroup,
  InputGroup,
  TextArea,
  Position,
  ControlGroup,
} from '@blueprintjs/core';
import classNames from 'classnames';
import { CLASSES } from 'common/classes';
import { DateInput } from '@blueprintjs/datetime';
import { FieldRequiredHint, Col, Row } from 'components';
import {
  AccountsSelectList,
  InputPrependText,
  MoneyInputGroup,
  Icon,
} from 'components';
import {
  inputIntent,
  momentFormatter,
  tansformDateValue,
  handleDateChange,
} from 'utils';
import { useQuickPaymentReceiveContext } from './QuickPaymentReceiveFormProvider';

/**
 * Quick payment receive form fields.
 */
export default function QuickPaymentReceiveFormFields({}) {
  const { accounts } = useQuickPaymentReceiveContext();

  const paymentReceiveFieldRef = useAutofocus();

  return (
    <div className={Classes.DIALOG_BODY}>
      <Row>
        <Col xs={5}>
          {/* ------------- Customer name ------------- */}
          <FastField name={'customer_id'}>
            {({ from, field, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'customer_name'} />}
                className={classNames('form-group--select-list', CLASSES.FILL)}
                labelInfo={<FieldRequiredHint />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name={'customer_id'} />}
              >
                <InputGroup
                  intent={inputIntent({ error, touched })}
                  minimal={true}
                  disabled={true}
                  {...field}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
        <Col xs={5}>
          {/* ------------ Payment receive no. ------------ */}
          <FastField name={'payment_receive_no'}>
            {({ form, field, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'payment_no'} />}
                labelInfo={<FieldRequiredHint />}
                className={('form-group--payment_receive_no', CLASSES.FILL)}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="payment_receive_no" />}
              >
                <InputGroup
                  intent={inputIntent({ error, touched })}
                  minimal={true}
                  {...field}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>
      {/*------------ Amount Received -----------*/}
      <FastField name={'payment_amount'}>
        {({
          form: { values, setFieldValue },
          field: { value },
          meta: { error, touched },
        }) => (
          <FormGroup
            label={<T id={'amount_received'} />}
            labelInfo={<FieldRequiredHint />}
            className={classNames('form-group--payment_amount', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="payment_amount" />}
          >
            <ControlGroup>
              <InputPrependText text={values.currency_code} />

              <MoneyInputGroup
                value={value}
                minimal={true}
                onChange={(amount) => {
                  setFieldValue('payment_amount', amount);
                }}
                intent={inputIntent({ error, touched })}
                inputRef={(ref) => (paymentReceiveFieldRef.current = ref)}
              />
            </ControlGroup>
          </FormGroup>
        )}
      </FastField>
      <Row>
        <Col xs={5}>
          {/* ------------- Payment date ------------- */}
          <FastField name={'payment_date'}>
            {({ form, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'payment_date'} />}
                labelInfo={<FieldRequiredHint />}
                className={classNames('form-group--select-list', CLASSES.FILL)}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="payment_date" />}
              >
                <DateInput
                  {...momentFormatter('YYYY/MM/DD')}
                  value={tansformDateValue(value)}
                  onChange={handleDateChange((formattedDate) => {
                    form.setFieldValue('payment_date', formattedDate);
                  })}
                  popoverProps={{ position: Position.BOTTOM, minimal: true }}
                  inputProps={{
                    leftIcon: <Icon icon={'date-range'} />,
                  }}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
        <Col xs={5}>
          {/* ------------ Deposit account ------------ */}
          <FastField name={'deposit_account_id'}>
            {({ form, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'deposit_to'} />}
                className={classNames(
                  'form-group--deposit_account_id',
                  'form-group--select-list',
                  CLASSES.FILL,
                )}
                labelInfo={<FieldRequiredHint />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name={'deposit_account_id'} />}
              >
                <AccountsSelectList
                  accounts={accounts}
                  labelInfo={<FieldRequiredHint />}
                  onAccountSelected={(account) => {
                    form.setFieldValue('deposit_account_id', account.id);
                  }}
                  defaultSelectText={<T id={'select_deposit_account'} />}
                  selectedAccountId={value}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>
      {/* ------------ Reference No. ------------ */}
      <FastField name={'reference_no'}>
        {({ form, field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'reference'} />}
            className={classNames('form-group--reference', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="reference" />}
          >
            <InputGroup
              intent={inputIntent({ error, touched })}
              minimal={true}
              {...field}
            />
          </FormGroup>
        )}
      </FastField>
      {/* --------- Statement --------- */}
      <FastField name={'statement'}>
        {({ form, field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'statement'} />}
            className={'form-group--statement'}
          >
            <TextArea growVertically={true} {...field} />
          </FormGroup>
        )}
      </FastField>
    </div>
  );
}
