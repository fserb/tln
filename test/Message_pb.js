/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
(function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.Message = (function() {
    
        /**
         * Properties of a Message.
         * @exports IMessage
         * @interface IMessage
         * @property {number|null} [id] Message id
         * @property {IServiceId|null} [serviceId] Message serviceId
         * @property {IServiceTime|null} [serviceTime] Message serviceTime
         * @property {Array.<IEvent>|null} [events] Message events
         * @property {number|null} [fieldForTesting] Message fieldForTesting
         */
    
        /**
         * Constructs a new Message.
         * @exports Message
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            this.events = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Message id.
         * @member {number} id
         * @memberof Message
         * @instance
         */
        Message.prototype.id = 0;
    
        /**
         * Message serviceId.
         * @member {IServiceId|null|undefined} serviceId
         * @memberof Message
         * @instance
         */
        Message.prototype.serviceId = null;
    
        /**
         * Message serviceTime.
         * @member {IServiceTime|null|undefined} serviceTime
         * @memberof Message
         * @instance
         */
        Message.prototype.serviceTime = null;
    
        /**
         * Message events.
         * @member {Array.<IEvent>} events
         * @memberof Message
         * @instance
         */
        Message.prototype.events = $util.emptyArray;
    
        /**
         * Message fieldForTesting.
         * @member {number} fieldForTesting
         * @memberof Message
         * @instance
         */
        Message.prototype.fieldForTesting = 0;
    
        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof Message
         * @static
         * @param {IMessage=} [properties] Properties to set
         * @returns {Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };
    
        /**
         * Encodes the specified Message message. Does not implicitly {@link Message.verify|verify} messages.
         * @function encode
         * @memberof Message
         * @static
         * @param {IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.serviceId != null && message.hasOwnProperty("serviceId"))
                $root.ServiceId.encode(message.serviceId, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.serviceTime != null && message.hasOwnProperty("serviceTime"))
                $root.ServiceTime.encode(message.serviceTime, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.events != null && message.events.length)
                for (var i = 0; i < message.events.length; ++i)
                    $root.Event.encode(message.events[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.fieldForTesting != null && message.hasOwnProperty("fieldForTesting"))
                writer.uint32(/* id 99, wireType 0 =*/792).int32(message.fieldForTesting);
            return writer;
        };
    
        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Message
         * @static
         * @param {IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.serviceId = $root.ServiceId.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.serviceTime = $root.ServiceTime.decode(reader, reader.uint32());
                    break;
                case 4:
                    if (!(message.events && message.events.length))
                        message.events = [];
                    message.events.push($root.Event.decode(reader, reader.uint32()));
                    break;
                case 99:
                    message.fieldForTesting = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Message message.
         * @function verify
         * @memberof Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.serviceId != null && message.hasOwnProperty("serviceId")) {
                var error = $root.ServiceId.verify(message.serviceId);
                if (error)
                    return "serviceId." + error;
            }
            if (message.serviceTime != null && message.hasOwnProperty("serviceTime")) {
                var error = $root.ServiceTime.verify(message.serviceTime);
                if (error)
                    return "serviceTime." + error;
            }
            if (message.events != null && message.hasOwnProperty("events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (var i = 0; i < message.events.length; ++i) {
                    var error = $root.Event.verify(message.events[i]);
                    if (error)
                        return "events." + error;
                }
            }
            if (message.fieldForTesting != null && message.hasOwnProperty("fieldForTesting"))
                if (!$util.isInteger(message.fieldForTesting))
                    return "fieldForTesting: integer expected";
            return null;
        };
    
        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.Message)
                return object;
            var message = new $root.Message();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.serviceId != null) {
                if (typeof object.serviceId !== "object")
                    throw TypeError(".Message.serviceId: object expected");
                message.serviceId = $root.ServiceId.fromObject(object.serviceId);
            }
            if (object.serviceTime != null) {
                if (typeof object.serviceTime !== "object")
                    throw TypeError(".Message.serviceTime: object expected");
                message.serviceTime = $root.ServiceTime.fromObject(object.serviceTime);
            }
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".Message.events: array expected");
                message.events = [];
                for (var i = 0; i < object.events.length; ++i) {
                    if (typeof object.events[i] !== "object")
                        throw TypeError(".Message.events: object expected");
                    message.events[i] = $root.Event.fromObject(object.events[i]);
                }
            }
            if (object.fieldForTesting != null)
                message.fieldForTesting = object.fieldForTesting | 0;
            return message;
        };
    
        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Message
         * @static
         * @param {Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.events = [];
            if (options.defaults) {
                object.id = 0;
                object.serviceId = null;
                object.serviceTime = null;
                object.fieldForTesting = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.serviceId != null && message.hasOwnProperty("serviceId"))
                object.serviceId = $root.ServiceId.toObject(message.serviceId, options);
            if (message.serviceTime != null && message.hasOwnProperty("serviceTime"))
                object.serviceTime = $root.ServiceTime.toObject(message.serviceTime, options);
            if (message.events && message.events.length) {
                object.events = [];
                for (var j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.Event.toObject(message.events[j], options);
            }
            if (message.fieldForTesting != null && message.hasOwnProperty("fieldForTesting"))
                object.fieldForTesting = message.fieldForTesting;
            return object;
        };
    
        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Message;
    })();
    
    $root.Event = (function() {
    
        /**
         * Properties of an Event.
         * @exports IEvent
         * @interface IEvent
         * @property {number|null} [time] Event time
         * @property {string|null} [action] Event action
         * @property {string|null} [args] Event args
         * @property {Array.<number>|null} [ids] Event ids
         */
    
        /**
         * Constructs a new Event.
         * @exports Event
         * @classdesc Represents an Event.
         * @implements IEvent
         * @constructor
         * @param {IEvent=} [properties] Properties to set
         */
        function Event(properties) {
            this.ids = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Event time.
         * @member {number} time
         * @memberof Event
         * @instance
         */
        Event.prototype.time = 0;
    
        /**
         * Event action.
         * @member {string} action
         * @memberof Event
         * @instance
         */
        Event.prototype.action = "";
    
        /**
         * Event args.
         * @member {string} args
         * @memberof Event
         * @instance
         */
        Event.prototype.args = "";
    
        /**
         * Event ids.
         * @member {Array.<number>} ids
         * @memberof Event
         * @instance
         */
        Event.prototype.ids = $util.emptyArray;
    
        /**
         * Creates a new Event instance using the specified properties.
         * @function create
         * @memberof Event
         * @static
         * @param {IEvent=} [properties] Properties to set
         * @returns {Event} Event instance
         */
        Event.create = function create(properties) {
            return new Event(properties);
        };
    
        /**
         * Encodes the specified Event message. Does not implicitly {@link Event.verify|verify} messages.
         * @function encode
         * @memberof Event
         * @static
         * @param {IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.time);
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.action);
            if (message.args != null && message.hasOwnProperty("args"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.args);
            if (message.ids != null && message.ids.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (var i = 0; i < message.ids.length; ++i)
                    writer.int32(message.ids[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Encodes the specified Event message, length delimited. Does not implicitly {@link Event.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Event
         * @static
         * @param {IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes an Event message from the specified reader or buffer.
         * @function decode
         * @memberof Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Event();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.double();
                    break;
                case 2:
                    message.action = reader.string();
                    break;
                case 3:
                    message.args = reader.string();
                    break;
                case 4:
                    if (!(message.ids && message.ids.length))
                        message.ids = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.ids.push(reader.int32());
                    } else
                        message.ids.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies an Event message.
         * @function verify
         * @memberof Event
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Event.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time !== "number")
                    return "time: number expected";
            if (message.action != null && message.hasOwnProperty("action"))
                if (!$util.isString(message.action))
                    return "action: string expected";
            if (message.args != null && message.hasOwnProperty("args"))
                if (!$util.isString(message.args))
                    return "args: string expected";
            if (message.ids != null && message.hasOwnProperty("ids")) {
                if (!Array.isArray(message.ids))
                    return "ids: array expected";
                for (var i = 0; i < message.ids.length; ++i)
                    if (!$util.isInteger(message.ids[i]))
                        return "ids: integer[] expected";
            }
            return null;
        };
    
        /**
         * Creates an Event message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Event
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Event} Event
         */
        Event.fromObject = function fromObject(object) {
            if (object instanceof $root.Event)
                return object;
            var message = new $root.Event();
            if (object.time != null)
                message.time = Number(object.time);
            if (object.action != null)
                message.action = String(object.action);
            if (object.args != null)
                message.args = String(object.args);
            if (object.ids) {
                if (!Array.isArray(object.ids))
                    throw TypeError(".Event.ids: array expected");
                message.ids = [];
                for (var i = 0; i < object.ids.length; ++i)
                    message.ids[i] = object.ids[i] | 0;
            }
            return message;
        };
    
        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Event
         * @static
         * @param {Event} message Event
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Event.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.ids = [];
            if (options.defaults) {
                object.time = 0;
                object.action = "";
                object.args = "";
            }
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = message.action;
            if (message.args != null && message.hasOwnProperty("args"))
                object.args = message.args;
            if (message.ids && message.ids.length) {
                object.ids = [];
                for (var j = 0; j < message.ids.length; ++j)
                    object.ids[j] = message.ids[j];
            }
            return object;
        };
    
        /**
         * Converts this Event to JSON.
         * @function toJSON
         * @memberof Event
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Event.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Event;
    })();
    
    $root.ServiceTime = (function() {
    
        /**
         * Properties of a ServiceTime.
         * @exports IServiceTime
         * @interface IServiceTime
         * @property {number|null} [now] ServiceTime now
         * @property {number|null} [real] ServiceTime real
         * @property {Array.<ServiceTime.IResponse>|null} [response] ServiceTime response
         */
    
        /**
         * Constructs a new ServiceTime.
         * @exports ServiceTime
         * @classdesc Represents a ServiceTime.
         * @implements IServiceTime
         * @constructor
         * @param {IServiceTime=} [properties] Properties to set
         */
        function ServiceTime(properties) {
            this.response = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * ServiceTime now.
         * @member {number} now
         * @memberof ServiceTime
         * @instance
         */
        ServiceTime.prototype.now = 0;
    
        /**
         * ServiceTime real.
         * @member {number} real
         * @memberof ServiceTime
         * @instance
         */
        ServiceTime.prototype.real = 0;
    
        /**
         * ServiceTime response.
         * @member {Array.<ServiceTime.IResponse>} response
         * @memberof ServiceTime
         * @instance
         */
        ServiceTime.prototype.response = $util.emptyArray;
    
        /**
         * Creates a new ServiceTime instance using the specified properties.
         * @function create
         * @memberof ServiceTime
         * @static
         * @param {IServiceTime=} [properties] Properties to set
         * @returns {ServiceTime} ServiceTime instance
         */
        ServiceTime.create = function create(properties) {
            return new ServiceTime(properties);
        };
    
        /**
         * Encodes the specified ServiceTime message. Does not implicitly {@link ServiceTime.verify|verify} messages.
         * @function encode
         * @memberof ServiceTime
         * @static
         * @param {IServiceTime} message ServiceTime message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceTime.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.now != null && message.hasOwnProperty("now"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.now);
            if (message.real != null && message.hasOwnProperty("real"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.real);
            if (message.response != null && message.response.length)
                for (var i = 0; i < message.response.length; ++i)
                    $root.ServiceTime.Response.encode(message.response[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified ServiceTime message, length delimited. Does not implicitly {@link ServiceTime.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceTime
         * @static
         * @param {IServiceTime} message ServiceTime message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceTime.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a ServiceTime message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceTime
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceTime} ServiceTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceTime.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceTime();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.now = reader.double();
                    break;
                case 2:
                    message.real = reader.double();
                    break;
                case 3:
                    if (!(message.response && message.response.length))
                        message.response = [];
                    message.response.push($root.ServiceTime.Response.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a ServiceTime message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceTime
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceTime} ServiceTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceTime.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a ServiceTime message.
         * @function verify
         * @memberof ServiceTime
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceTime.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.now != null && message.hasOwnProperty("now"))
                if (typeof message.now !== "number")
                    return "now: number expected";
            if (message.real != null && message.hasOwnProperty("real"))
                if (typeof message.real !== "number")
                    return "real: number expected";
            if (message.response != null && message.hasOwnProperty("response")) {
                if (!Array.isArray(message.response))
                    return "response: array expected";
                for (var i = 0; i < message.response.length; ++i) {
                    var error = $root.ServiceTime.Response.verify(message.response[i]);
                    if (error)
                        return "response." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a ServiceTime message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceTime
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceTime} ServiceTime
         */
        ServiceTime.fromObject = function fromObject(object) {
            if (object instanceof $root.ServiceTime)
                return object;
            var message = new $root.ServiceTime();
            if (object.now != null)
                message.now = Number(object.now);
            if (object.real != null)
                message.real = Number(object.real);
            if (object.response) {
                if (!Array.isArray(object.response))
                    throw TypeError(".ServiceTime.response: array expected");
                message.response = [];
                for (var i = 0; i < object.response.length; ++i) {
                    if (typeof object.response[i] !== "object")
                        throw TypeError(".ServiceTime.response: object expected");
                    message.response[i] = $root.ServiceTime.Response.fromObject(object.response[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a ServiceTime message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceTime
         * @static
         * @param {ServiceTime} message ServiceTime
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceTime.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.response = [];
            if (options.defaults) {
                object.now = 0;
                object.real = 0;
            }
            if (message.now != null && message.hasOwnProperty("now"))
                object.now = options.json && !isFinite(message.now) ? String(message.now) : message.now;
            if (message.real != null && message.hasOwnProperty("real"))
                object.real = options.json && !isFinite(message.real) ? String(message.real) : message.real;
            if (message.response && message.response.length) {
                object.response = [];
                for (var j = 0; j < message.response.length; ++j)
                    object.response[j] = $root.ServiceTime.Response.toObject(message.response[j], options);
            }
            return object;
        };
    
        /**
         * Converts this ServiceTime to JSON.
         * @function toJSON
         * @memberof ServiceTime
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceTime.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        ServiceTime.Response = (function() {
    
            /**
             * Properties of a Response.
             * @memberof ServiceTime
             * @interface IResponse
             * @property {number|null} [from] Response from
             * @property {number|null} [origin] Response origin
             * @property {number|null} [delay] Response delay
             */
    
            /**
             * Constructs a new Response.
             * @memberof ServiceTime
             * @classdesc Represents a Response.
             * @implements IResponse
             * @constructor
             * @param {ServiceTime.IResponse=} [properties] Properties to set
             */
            function Response(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Response from.
             * @member {number} from
             * @memberof ServiceTime.Response
             * @instance
             */
            Response.prototype.from = 0;
    
            /**
             * Response origin.
             * @member {number} origin
             * @memberof ServiceTime.Response
             * @instance
             */
            Response.prototype.origin = 0;
    
            /**
             * Response delay.
             * @member {number} delay
             * @memberof ServiceTime.Response
             * @instance
             */
            Response.prototype.delay = 0;
    
            /**
             * Creates a new Response instance using the specified properties.
             * @function create
             * @memberof ServiceTime.Response
             * @static
             * @param {ServiceTime.IResponse=} [properties] Properties to set
             * @returns {ServiceTime.Response} Response instance
             */
            Response.create = function create(properties) {
                return new Response(properties);
            };
    
            /**
             * Encodes the specified Response message. Does not implicitly {@link ServiceTime.Response.verify|verify} messages.
             * @function encode
             * @memberof ServiceTime.Response
             * @static
             * @param {ServiceTime.IResponse} message Response message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Response.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.from != null && message.hasOwnProperty("from"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.from);
                if (message.origin != null && message.hasOwnProperty("origin"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.origin);
                if (message.delay != null && message.hasOwnProperty("delay"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.delay);
                return writer;
            };
    
            /**
             * Encodes the specified Response message, length delimited. Does not implicitly {@link ServiceTime.Response.verify|verify} messages.
             * @function encodeDelimited
             * @memberof ServiceTime.Response
             * @static
             * @param {ServiceTime.IResponse} message Response message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Response.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Response message from the specified reader or buffer.
             * @function decode
             * @memberof ServiceTime.Response
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {ServiceTime.Response} Response
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Response.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceTime.Response();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.from = reader.int32();
                        break;
                    case 2:
                        message.origin = reader.double();
                        break;
                    case 3:
                        message.delay = reader.double();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Response message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof ServiceTime.Response
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {ServiceTime.Response} Response
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Response.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Response message.
             * @function verify
             * @memberof ServiceTime.Response
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Response.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.from != null && message.hasOwnProperty("from"))
                    if (!$util.isInteger(message.from))
                        return "from: integer expected";
                if (message.origin != null && message.hasOwnProperty("origin"))
                    if (typeof message.origin !== "number")
                        return "origin: number expected";
                if (message.delay != null && message.hasOwnProperty("delay"))
                    if (typeof message.delay !== "number")
                        return "delay: number expected";
                return null;
            };
    
            /**
             * Creates a Response message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof ServiceTime.Response
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {ServiceTime.Response} Response
             */
            Response.fromObject = function fromObject(object) {
                if (object instanceof $root.ServiceTime.Response)
                    return object;
                var message = new $root.ServiceTime.Response();
                if (object.from != null)
                    message.from = object.from | 0;
                if (object.origin != null)
                    message.origin = Number(object.origin);
                if (object.delay != null)
                    message.delay = Number(object.delay);
                return message;
            };
    
            /**
             * Creates a plain object from a Response message. Also converts values to other types if specified.
             * @function toObject
             * @memberof ServiceTime.Response
             * @static
             * @param {ServiceTime.Response} message Response
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Response.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.from = 0;
                    object.origin = 0;
                    object.delay = 0;
                }
                if (message.from != null && message.hasOwnProperty("from"))
                    object.from = message.from;
                if (message.origin != null && message.hasOwnProperty("origin"))
                    object.origin = options.json && !isFinite(message.origin) ? String(message.origin) : message.origin;
                if (message.delay != null && message.hasOwnProperty("delay"))
                    object.delay = options.json && !isFinite(message.delay) ? String(message.delay) : message.delay;
                return object;
            };
    
            /**
             * Converts this Response to JSON.
             * @function toJSON
             * @memberof ServiceTime.Response
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Response.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Response;
        })();
    
        return ServiceTime;
    })();
    
    $root.ServiceId = (function() {
    
        /**
         * Properties of a ServiceId.
         * @exports IServiceId
         * @interface IServiceId
         * @property {string|null} [guid] ServiceId guid
         * @property {number|null} [request] ServiceId request
         * @property {ServiceId.Status|null} [status] ServiceId status
         * @property {number|null} [suggestion] ServiceId suggestion
         */
    
        /**
         * Constructs a new ServiceId.
         * @exports ServiceId
         * @classdesc Represents a ServiceId.
         * @implements IServiceId
         * @constructor
         * @param {IServiceId=} [properties] Properties to set
         */
        function ServiceId(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * ServiceId guid.
         * @member {string} guid
         * @memberof ServiceId
         * @instance
         */
        ServiceId.prototype.guid = "";
    
        /**
         * ServiceId request.
         * @member {number} request
         * @memberof ServiceId
         * @instance
         */
        ServiceId.prototype.request = 0;
    
        /**
         * ServiceId status.
         * @member {ServiceId.Status} status
         * @memberof ServiceId
         * @instance
         */
        ServiceId.prototype.status = 0;
    
        /**
         * ServiceId suggestion.
         * @member {number} suggestion
         * @memberof ServiceId
         * @instance
         */
        ServiceId.prototype.suggestion = 0;
    
        /**
         * Creates a new ServiceId instance using the specified properties.
         * @function create
         * @memberof ServiceId
         * @static
         * @param {IServiceId=} [properties] Properties to set
         * @returns {ServiceId} ServiceId instance
         */
        ServiceId.create = function create(properties) {
            return new ServiceId(properties);
        };
    
        /**
         * Encodes the specified ServiceId message. Does not implicitly {@link ServiceId.verify|verify} messages.
         * @function encode
         * @memberof ServiceId
         * @static
         * @param {IServiceId} message ServiceId message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceId.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.guid != null && message.hasOwnProperty("guid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.guid);
            if (message.request != null && message.hasOwnProperty("request"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.request);
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
            if (message.suggestion != null && message.hasOwnProperty("suggestion"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.suggestion);
            return writer;
        };
    
        /**
         * Encodes the specified ServiceId message, length delimited. Does not implicitly {@link ServiceId.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceId
         * @static
         * @param {IServiceId} message ServiceId message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceId.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a ServiceId message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceId
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceId} ServiceId
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceId.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceId();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.guid = reader.string();
                    break;
                case 2:
                    message.request = reader.int32();
                    break;
                case 3:
                    message.status = reader.int32();
                    break;
                case 4:
                    message.suggestion = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a ServiceId message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceId
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceId} ServiceId
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceId.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a ServiceId message.
         * @function verify
         * @memberof ServiceId
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceId.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.guid != null && message.hasOwnProperty("guid"))
                if (!$util.isString(message.guid))
                    return "guid: string expected";
            if (message.request != null && message.hasOwnProperty("request"))
                if (!$util.isInteger(message.request))
                    return "request: integer expected";
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.suggestion != null && message.hasOwnProperty("suggestion"))
                if (!$util.isInteger(message.suggestion))
                    return "suggestion: integer expected";
            return null;
        };
    
        /**
         * Creates a ServiceId message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceId
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceId} ServiceId
         */
        ServiceId.fromObject = function fromObject(object) {
            if (object instanceof $root.ServiceId)
                return object;
            var message = new $root.ServiceId();
            if (object.guid != null)
                message.guid = String(object.guid);
            if (object.request != null)
                message.request = object.request | 0;
            switch (object.status) {
            case "INVALID":
            case 0:
                message.status = 0;
                break;
            case "REQUEST":
            case 1:
                message.status = 1;
                break;
            case "ACCEPT":
            case 2:
                message.status = 2;
                break;
            case "DENIED":
            case 3:
                message.status = 3;
                break;
            }
            if (object.suggestion != null)
                message.suggestion = object.suggestion | 0;
            return message;
        };
    
        /**
         * Creates a plain object from a ServiceId message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceId
         * @static
         * @param {ServiceId} message ServiceId
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceId.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.guid = "";
                object.request = 0;
                object.status = options.enums === String ? "INVALID" : 0;
                object.suggestion = 0;
            }
            if (message.guid != null && message.hasOwnProperty("guid"))
                object.guid = message.guid;
            if (message.request != null && message.hasOwnProperty("request"))
                object.request = message.request;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.ServiceId.Status[message.status] : message.status;
            if (message.suggestion != null && message.hasOwnProperty("suggestion"))
                object.suggestion = message.suggestion;
            return object;
        };
    
        /**
         * Converts this ServiceId to JSON.
         * @function toJSON
         * @memberof ServiceId
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceId.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Status enum.
         * @name ServiceId.Status
         * @enum {string}
         * @property {number} INVALID=0 INVALID value
         * @property {number} REQUEST=1 REQUEST value
         * @property {number} ACCEPT=2 ACCEPT value
         * @property {number} DENIED=3 DENIED value
         */
        ServiceId.Status = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "INVALID"] = 0;
            values[valuesById[1] = "REQUEST"] = 1;
            values[valuesById[2] = "ACCEPT"] = 2;
            values[valuesById[3] = "DENIED"] = 3;
            return values;
        })();
    
        return ServiceId;
    })();

    return $root;
})(protobuf);
