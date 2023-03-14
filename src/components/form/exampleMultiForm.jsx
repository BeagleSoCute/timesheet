import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import styled from "styled-components";
import { Form, Row, Col, Input, Select, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
//CONSTANTS
import { REGEX } from "src/constants/index";
// Components
import ModalTemplate from "src/components/shared/modal/ModalTemplate.jsx";
import Typography from "src/components/shared/typography";
import Button from "src/components/shared/button/Button";
//Service
import { updatePortfolio } from "src/services/profile.service";
//Helpers
import { transformTrim } from "src/helpers/common.helper";
import {
  tranFormIncomingPortfolio,
  tranFormSendingPortfolio,
} from "src/helpers/profile.helper";
import { scrollToError } from "src/helpers/form.helper";
// Hooks
import { useAuth } from "src/hooks/authenticate.hook";

const propTypes = {
  isModalVisible: PropTypes.bool,
  onSetModalVisible: PropTypes.func,
  portfolios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  enumPortFoilio: PropTypes.arrayOf(
    PropTypes.shape({
      enum_value: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  onSuccess: PropTypes.func,
};
const defaultProps = {
  isModalVisible: false,
  portfolios: [{}],
  onSetModalVisible: () => {},
  onSuccess: () => {},
};
const layout = {
  labelCol: {
    span: 24,
  },
};
const renderDefault = (options) =>
  options.map((option) => (
    <Select.Option
      label={option.text}
      key={option.enum_value}
      value={option.text}
    >
      {option.text}{" "}
    </Select.Option>
  ));
const EditPortfolioContent = ({ form, enums, options, handleChange, intl }) => {
  const rules = {
    name: [
      {
        required: true,
        message: <FormattedMessage id="form.error.option.selectWeb.required" />,
      },
    ],
    url: [
      {
        required: true,
        message: <FormattedMessage id="form.error.input.urlWeb.required" />,
        transform: (text) => transformTrim(text),
      },
      {
        pattern: REGEX.REGEX_VALID_URL,
        message: (
          <FormattedMessage id="profile.modal.editPortfolio.input.urlWeb.format" />
        ),
        transform: (text) => transformTrim(text),
      },
    ],
  };
  return (
    <Form {...layout} name="basic" form={form} requiredMark={false}>
      <Form.List name="items">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <div className="input-fields" key={field.key}>
                  <Row gutter={18}>
                    <Col md={8} xs={24}>
                      <Form.Item
                        {...field}
                        label={<FormattedMessage id="form.option.selectWeb" />}
                        name={[index, "name"]}
                        rules={rules.name}
                      >
                        <Select
                          showSearch
                          dropdownClassName="tl-select-dropdown"
                          size="large"
                          onSelect={() => handleChange(enums)}
                          filterOption={(input, option) =>
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          placeholder={
                            <FormattedMessage id="form.option.selectWeb.placeholder" />
                          }
                        >
                          {renderDefault(options)}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={fields.length > 1 ? 13 : 16} xs={24}>
                      <Form.Item
                        {...field}
                        label={<FormattedMessage id="form.input.urlWeb" />}
                        name={[index, "url"]}
                        rules={rules.url}
                      >
                        <Input
                          size="large"
                          maxLength={255}
                          placeholder={intl.formatMessage({
                            id: "form.input.urlWeb.placeholder",
                          })}
                        />
                      </Form.Item>
                    </Col>
                    {fields.length > 1 ? (
                      <Fragment>
                        <Form.Item label=" ">
                          <Col md={6} xs={4}>
                            <DeleteOutlined
                              onClick={() => {
                                remove(field.name);
                                handleChange(enums);
                              }}
                              className="delete-icon"
                              style={{ fontSize: "30px" }}
                            />
                          </Col>
                        </Form.Item>
                        <Button
                          htmlType="button"
                          type="default"
                          onClick={() => {
                            remove(field.name);
                            handleChange(enums);
                          }}
                          className="delete-btn"
                        >
                          <FormattedMessage id="profile.modal.editPortfolio.delete.btn" />
                          <span>
                            {" "}
                            <DeleteOutlined />{" "}
                          </span>
                        </Button>
                      </Fragment>
                    ) : null}
                  </Row>
                </div>
              ))}
              <Divider className="divider-add" />
              <Form.Item>
                <Button
                  htmlType="button"
                  type="default"
                  onClick={() => add()}
                  style={{ width: "100%", marginTop: "28px" }}
                >
                  <FormattedMessage id="profile.modal.editPortfolio.button" />
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Form>
  );
};
const EditPortfolioModal = ({
  isModalVisible,
  enumPortFoilio,
  onSetModalVisible,
  portfolios,
  onSuccess,
  item,
  intl,
}) => {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [enums, setEnums] = useState([]);
  const [options, setOptions] = useState([]);
  const { userProfile } = useAuth();
  const reset = () => {
    form.resetFields();
    onSetModalVisible(false);
  };
  useEffect(() => {
    const init = async () => {
      try {
        const portfoliosTranform = await tranFormIncomingPortfolio(
          enumPortFoilio,
          portfolios
        );
        setEnums(enumPortFoilio);
        setLoading(false);
        if (portfolios.length === 0) {
          form.setFieldsValue({
            items: [{}],
          });
        } else {
          form.setFieldsValue({
            items: portfoliosTranform,
          });
        }
        setOptions(handleOptions(enumPortFoilio));
      } catch (err) {
        console.log("error in init EditPortfolioModal");
      }
    };
    init();
    //eslint-disable-next-line
  }, [form, item]);

  const handleChangeStack = (enums) => {
    const result = handleOptions(enums);
    setOptions(result);
  };
  const handleOptions = (enums) => {
    //eslint-disable-next-line
    return enums.filter((enumItem) => {
      const fields = form.getFieldsValue().items;
      const fieldResult = fields.find(
        (field) => field && field.name === enumItem.text
      );
      // it will not return enum when that stack is selected
      if (!fieldResult || enumItem.enum_value === "other") {
        return enumItem;
      }
    });
  };
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        items: tranFormSendingPortfolio(enums, values),
      };
      await updatePortfolio(userProfile.supply.code, payload);
      onSuccess();
      reset();
    } catch (err) {
      console.log("error in modal submit edit portfolio ");
    }
  };
  const handleOk = async () => {
    const values = await scrollToError(form.validateFields(), form);
    if (!values) {
      return;
    }
    onSubmit(values);
  };
  const portfolioContentProps = {
    enums: enums,
    form: form,
    intl: intl,
    options: options,
    handleChange: handleChangeStack,
  };
  const modalProps = {
    className: "modal-portfolio",
    visible: isModalVisible,
    loading: loading,
    onOk: handleOk,
    onClose: reset,
    title: <FormattedMessage id="profile.modal.editPortfolio.title" />,
  };
  return (
    <StyledModal {...modalProps}>
      <StyledDiv className="editPortfolio-modal">
        <div className="sub-title">
          <Typography.Title level={4}>
            <FormattedMessage id="profile.modal.editPortfolio.subTitle" />
          </Typography.Title>
          <Typography.Text className="description" level={1}>
            <FormattedMessage id="profile.modal.editPortfolio.subTitle.description" />
          </Typography.Text>
        </div>
        <EditPortfolioContent {...portfolioContentProps} />
      </StyledDiv>
    </StyledModal>
  );
};
const StyledDiv = styled.div`
  &.editPortfolio-modal {
    .sub-title {
      margin-bottom: 32px;
    }
    .sub-title .description {
      opacity: 0.8;
    }
    .add-website {
      width: 100%;
    }
    .divider-add {
      display: none;
      @media (max-width: 767px) {
        display: flex;
        border-top: 1px dashed #e0e0e0;
      }
    }
    .delete-icon {
      margin-left: 16px;
      color: rgba(7, 3, 20, 0.64);
      cursor: pointer;
      @media (max-width: 767px) {
        display: none;
      }
    }
    .delete-btn {
      display: none;
      @media (max-width: 767px) {
        display: inline-block;
        margin: 12px 0px 20px 0px;
        width: 100%;
      }
    }
    .delete-btn span {
      margin-left: 1px;
    }
  }
`;
const StyledModal = styled(ModalTemplate)`
  &.modal-portfolio {
  }
`;
EditPortfolioModal.propTypes = propTypes;
EditPortfolioModal.defaultProps = defaultProps;

export default injectIntl(EditPortfolioModal);
