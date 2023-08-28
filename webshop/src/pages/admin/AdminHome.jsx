import React from 'react'
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function AdminHome() {
  const { t } = useTranslation();

  return (
    <div>
      <Button as={Link} to="/admin/maintain-categories" variant="primary">{t("admin.maintain-categories")}</Button>{' '}
      <Button as={Link} to="/admin/maintain-shops" variant="secondary">{t("admin.maintain-shops")}</Button>{' '}
      <Button as={Link} to="/admin/add-product" variant="success">{t("admin.add-product")}</Button>{' '}
      <Button as={Link} to="/admin/maintain-products" variant="warning">{t("admin.maintain-products")}</Button>{' '}
    </div>
  )
}

export default AdminHome