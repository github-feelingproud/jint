﻿using Jint.Native.Function;
using Jint.Native.Object;
using Jint.Runtime;
using Jint.Runtime.Descriptors;

namespace Jint.Native.Boolean
{
    public sealed class BooleanConstructor : FunctionInstance, IConstructor
    {
        private readonly Engine _engine;

        public BooleanConstructor(Engine engine)
            : base(engine, new ObjectInstance(engine, engine.Object), null, null, false)
        {
            _engine = engine;

            // the constructor is the function constructor of an object
            Prototype.DefineOwnProperty("constructor", new DataDescriptor(this) { Writable = true, Enumerable = false, Configurable = false }, false);
            Prototype.DefineOwnProperty("prototype", new DataDescriptor(Prototype) { Writable = true, Enumerable = false, Configurable = false }, false);

        }

        public override object Call(object thisObject, object[] arguments)
        {
            return Construct(arguments);
        }

        /// <summary>
        /// http://www.ecma-international.org/ecma-262/5.1/#sec-15.7.2.1
        /// </summary>
        /// <param name="arguments"></param>
        /// <returns></returns>
        public ObjectInstance Construct(object[] arguments)
        {
            return Construct(TypeConverter.ToBoolean(arguments[0]));
        }

        public BooleanInstance Construct(bool value)
        {
            var instance = new BooleanInstance(_engine, Prototype);
            instance.PrimitiveValue = value;
            return instance;
        }
    }
}