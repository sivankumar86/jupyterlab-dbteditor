try:
    from dbt.cli.main import dbtRunnerResult
except (ModuleNotFoundError, ImportError):
    dbtRunnerResult = None
from dbt.cli.main import dbtRunner

from dbt.contracts.graph.manifest import Manifest

def read_serialized_manifest(path: str):
    """Returns serialized manifest file from `path`.

    Raises:
        StateNotFoundException: if file is not found.
    """
    try:
        with open(path, "rb") as fh:
            return fh.read()
    except FileNotFoundError as e:
        print("error")

# def serialize_manifest(manifest, serialize_path):
#     filesystem_service.write_file(serialize_path, manifest.to_msgpack())


def deserialize_manifest(serialize_path):
    manifest_packed = read_serialized_manifest(serialize_path)
    return Manifest.from_msgpack(manifest_packed)

def compile_sql(manifest, project_dir, sql_config):
    # Currently this command will load project and profile from disk
    # It uses the manifest passed in
    try:
        profile_name = "jaffle_shop"
        sql="select * from {{ ref('stg_orders') }}"
        project_dir='/Users/sivakumar/project/jaffle_shop'
        # Invoke dbtRunner to compile SQL code
        # TODO skip relational cache.
        run_result = dbtRunner(manifest=manifest).invoke(
            ["compile", "--inline", sql],
            profile=profile_name,
            project_dir=project_dir,
            introspect=False,
            send_anonymous_usage_stats=False,
            populate_cache=False,
            write_json=False,
            write_manifest=False,
        )
        # dbt-core 1.5.0-latest changes the return type from a tuple to a
        # dbtRunnerResult obj and no longer raises exceptions on invoke
        if (
            run_result
            and type(run_result) == dbtRunnerResult
            and not run_result.success
        ):
            # If task had unhandled errors, raise
            if run_result.exception:
                raise run_result.exception
        # convert to RemoteCompileResult to keep original return format
        node_result = run_result.result.results[0]

    except Exception as e:
        print("error"+e)

    return node_result


deserialize_manifest("/Users/sivakumar/project/jaffle_shop/target/manifest.json")
