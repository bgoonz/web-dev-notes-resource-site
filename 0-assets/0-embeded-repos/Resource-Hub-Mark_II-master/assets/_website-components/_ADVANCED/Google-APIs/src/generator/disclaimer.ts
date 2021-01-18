// Copyright 2020 Google LLC



import {request} from 'gaxios';
import {writeFileSync} from 'fs';

export const libraryListUrl =
  'https://raw.githubusercontent.com/googleapis/google-cloud-node/master/libraries.json';

export interface LibraryMetadata {
  name: string;
  name_pretty: string;
  product_documentation: string;
  client_documentation: string;
  issue_tracker: string;
  release_level: string;
  language: string;
  repo: string;
  distribution_name: string;
  api_id: string;
  requires_billing: boolean;
}

export interface Disclaimer {
  api: string;
  package: string;
}

// exported for mocking purposes
export const gfs = {
  writeFileSync,
};

/**
 * Reach out to google-cloud-node, and get a list of available client libraries
 * that are veneer or GAPIC.  Use that to populate a JSON file that will be
 * used during generation to call out improved clients in READMEs for a given
 * API.
 *
 * To use this, run `node build/src/generator/disclaimers`.
 */
export async function main() {
  const res = await request<LibraryMetadata[]>({url: libraryListUrl});
  const disclaimers = res.data.map(lib => {
    return {
      api: lib.api_id.split('.')[0],
      package: lib.distribution_name,
    };
  });
  gfs.writeFileSync('./disclaimers.json', JSON.stringify(disclaimers, null, 2));
}

if (require.main === module) {
  main();
}
