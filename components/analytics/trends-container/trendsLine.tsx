import React from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { KEY_ICONS } from "../utils";

interface TrendsLineProps {
  /**
    This is the key for KEY_ICONS. It will automatically map the icons and text value
    It will automatically update the key map for the week calendar for Analytics pages
    */
  item: string;
  /**
    This is the value for the given item
    */
  value: string;
  /**
    This is the color of the text to display
    */
  color: string;
}

const TrendsLine = ({ value, color, item }: TrendsLineProps) => (
  <Row className="py-2">
    <Col xs={2}>
      <OverlayTrigger
        placement={"top"}
        overlay={<Tooltip id={`tooltip-top`}>{KEY_ICONS[item].name}</Tooltip>}
      >
        {KEY_ICONS[item].icon}
      </OverlayTrigger>
    </Col>
    <Col xs={10} style={{ color }}>
      {value}
    </Col>
  </Row>
);

export default TrendsLine;
