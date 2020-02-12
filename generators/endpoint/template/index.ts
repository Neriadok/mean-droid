import {deleteModel, getModel, postModel, putModel} from "../../database";
import {<%= classify(name) %>Model} from "../../database/models/<%= dasherize(name) %>";

export async function getMethod(req, res) {
  await getModel(<%= classify(name) %>Model, req, res);
}

export async function postMethod(req, res) {
  await postModel(<%= classify(name) %>Model, req, res);
}

export async function putMethod(req, res) {
  await putModel(<%= classify(name) %>Model, req, res);
}

export async function deleteMethod(req, res) {
  await deleteModel(<%= classify(name) %>Model, req, res);
}
