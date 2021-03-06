// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AccountId, Balance, BlockNumber, Hash } from '@polkadot/types/interfaces';
import { ITuple } from '@polkadot/types/types';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { DeriveProposalImage } from '../types';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bytes, Option } from '@polkadot/types';

import { memo } from '../util';
import { parseImage } from './util';

type PreImage = Option<ITuple<[Bytes, AccountId, Balance, BlockNumber]>>;

export function preimage (instanceId: string, api: ApiInterfaceRx): (hash: Hash) => Observable<DeriveProposalImage | undefined> {
  return memo(instanceId, (hash: Hash): Observable<DeriveProposalImage | undefined> =>
    api.query.democracy.preimages<PreImage>(hash).pipe(
      map((imageOpt) => parseImage(api, imageOpt))
    )
  );
}
