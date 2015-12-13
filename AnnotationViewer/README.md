# MIMIC "Annotation Viewer" for SAP HANA

Annotation Viewer is a web application to search and view [MIMIC](https://mimic.physionet.org/)'s clinical texts along with the anntations of [Unified Medical Language System (UMLS)](https://www.nlm.nih.gov/research/umls/) concepts.

This application is built using [SAP HANA](http://hana.sap.com/)'s XSJS server-side scripts. Therefore, to install the Annotation Viewer application, it requires the SAP HANA services to be running on the server, with the complete [MIMIC II version 2.6 Clinical Database](https://physionet.org/mimic2/mimic2_clinical_overview.shtml) already loaded. It also uses [jQuery](https://jquery.com/), [Bootstrap](http://getbootstrap.com/), [Bootstrap Multiselect](https://github.com/davidstutz/bootstrap-multiselect) and [DataTables](https://datatables.net/) at the client-side.

The UMLS Concepts are extracted using SAP HANA's Text Analytics tool.

The Annotation Viewer application for SAP HANA is developed by Ishrar Hussain, solely for the purpose of research. It allows clinicians and domain experts to do fast search over the clininal reports of the very large MIMIC II dataset, and to browse and visualize the UMLS concepts as text annotations overlayed on the original texts of the clinical reports.

![Fig.1: Search and browse clinical notes in MIMIC.](example1.PNG?raw=true "Fig.1: Search and browse clinical notes in MIMIC.")

![Fig.2: View UMLS Concept annotations on MIMIC notes.](example2.PNG?raw=true "Fig.2: View UMLS Concept annotations on MIMIC notes.")

## License

**Apache License, Version 2.0**

Copyright (c) 2015 Ishrar Hussain

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

**BSD 3-Clause License**

Copyright (c) 2015 Ishrar Hussain
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Ishrar Hussain nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
