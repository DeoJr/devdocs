/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import {DataObject} from "../../../data-store";
import {get} from "../../../utils/object";
import ConverterInterface from "../../converter-interface";
import ImageArrayObject from "../../image-array-object";

/**
 * @api
 */
export default class BackgroundImage implements ConverterInterface {
    /**
     * Convert value to internal format
     *
     * @param value string
     * @returns {string | object}
     */
    public fromDom(value: string): string | object {
        return value;
    }

    /**
     * Convert value to knockout format
     *
     * @param name string
     * @param data Object
     * @returns {string}
     */
    public toDom(name: string, data: DataObject): string {
        const value = get<ImageArrayObject>(data, name);
        if (value && typeof value[0] === "object") {
            return "url(" + value[0].url + ")";
        }
        return "";
    }
}