import json

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado

NAMESPACE="dbteditor"
class DbtHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        self.finish(json.dumps({
            "data": "This is /dbteditor/get-example endpoint!"
        }))

class DbtCompile(DbtHandler):
      
    @tornado.web.authenticated
    async def post(self, path: str = ""):
        self.finish(json.dumps({
            "data": "This is dbt compile"
        }))



def setup_handlers(web_app):
    host_pattern = ".*$"

    base_url = web_app.settings["base_url"]
    handlers_with_path=[("/dbtcompile",DbtCompile)]
    git_handlers = (
        [
            (url_path_join(base_url, NAMESPACE + path_regex + endpoint), handler)
            for endpoint, handler in handlers_with_path
        ])
    web_app.add_handlers(host_pattern, git_handlers)
