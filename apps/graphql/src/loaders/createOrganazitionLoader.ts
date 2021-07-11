import { PrismastoreService } from '@app/prismastore';
import { mapFromArray } from '@app/tools/utils';
import * as DataLoader from 'dataloader';

export function createOrganazitionLoader(prisma: PrismastoreService) {
  return new DataLoader<string, any>(async (ids: string[]) => {
    const organazitions = await prisma.organazition.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    const organazitionMap = mapFromArray(
      organazitions,
      (organazition) => organazition.id,
    );
    return ids.map((id) => organazitionMap[id]);
  });
}
