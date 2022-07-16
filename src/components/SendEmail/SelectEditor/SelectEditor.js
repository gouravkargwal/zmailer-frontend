import React, { useContext } from "react";
import { Button, Card, Row, Col, Drawer } from "antd";
import SendEmailContext from "../../../Context/SendEmailContext";
import WebEditor from "../WebEditor/WebEditor";
import PreviewEmail from "../PreviewEmail";

const SelectEditor = () => {
  const {
    openWebDrawer,
    openHtmlDrawer,
    htmlDrawer,
    webDrawer,
    onCloseHtmlDrawer,
    onCloseWebDrawer,
  } = useContext(SendEmailContext);
  return (
    <>
      <Row justify="center" gutter={45}>
        <Col span={6} style={{ maxWidth: 240 }}>
          <Card
            cover={
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRY89ymB5vMrQt0K5pRadoZ5-6TRPknPCqAA&usqp=CAU"
                alt="programme"
              ></img>
            }
          >
            <Card.Meta
              title="Design Editor"
              description="Visual, drag & drop editing with access to modify HTML when you need it."
            />
          </Card>
          <Button type="primary" block onClick={openWebDrawer}>
            Web Editor
          </Button>
        </Col>
        <Col span={6} style={{ maxWidth: 240 }}>
          <Card
            cover={
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRY89ymB5vMrQt0K5pRadoZ5-6TRPknPCqAA&usqp=CAU"
                alt="programme"
              ></img>
            }
          >
            <Card.Meta
              title="Code Editor"
              description="Feature-rich HTML editing with visual preview for complete control of every pixel."
            />
          </Card>
          <Button type="primary" block onClick={openHtmlDrawer}>
            HTML Editor
          </Button>
        </Col>
      </Row>

      <Drawer
        title="Web Editor"
        placement="bottom"
        onClose={onCloseWebDrawer}
        visible={webDrawer}
        height="100vh"
        key="webeditor"
      >
        <WebEditor />
      </Drawer>

      <Drawer
        title="HTML Editor"
        placement="bottom"
        onClose={onCloseHtmlDrawer}
        visible={htmlDrawer}
        height="100vh"
        key="htmleditor"
      >
        <PreviewEmail />
      </Drawer>
    </>
  );
};

export default SelectEditor;
