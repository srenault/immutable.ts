# immutable.ts

This Typescript library brings some concepts from functionnal programming.  
Some immutable structures like List and Option are provided.  
The API is strongly inspired from Scala.

This library can be compiled only with the current Typescript 'develop' branch.  
In order to use grunt-typescript, I [fix](https://github.com/srenault/grunt-typescript/commit/484b9db5f35d8e50cd1d2e8f2443fc8527a2d0eb) it to make it work with the last version of Typescript.

Several grunt tasks are defined to build this project:

* The _default_ grunt task compiles the library, copy it to the sample project, and compiles the sample project.
* The _dev_ task is the same but with the live reload.
* The _lib_ task compiles the library.
* The _sample_ task copy the last version of the library to the sample project, and compiles the sample project.

### License

This software is licensed under the Apache 2 license, quoted below.

Copyright 2013 Sébastien Renault.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
