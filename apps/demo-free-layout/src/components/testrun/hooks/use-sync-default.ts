/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect } from 'react';

import { TestRunFormMeta } from '../testrun-form/type';

export const useSyncDefault = (params: {
  formMeta: TestRunFormMeta;
  values: Record<string, unknown>;
  setValues: (values: Record<string, unknown>) => void;
}) => {
  const { formMeta, values, setValues } = params;

  useEffect(() => {
    let formMetaValues: Record<string, unknown> = {};
    formMeta.map((meta) => {
      // If there is no value in values but there is a default value, trigger onChange once
      if (!(meta.name in values) && meta.defaultValue !== undefined) {
        formMetaValues = { ...formMetaValues, [meta.name]: meta.defaultValue };
      }
    });
    setValues({
      ...values,
      ...formMetaValues,
    });
  }, [formMeta]);
};
